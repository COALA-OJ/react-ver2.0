import React, { Component } from 'react';
import { AuthContent,InputWithLabel, AuthButton, RightAlignedLink, AuthError  } from '../../components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../redux/modules/auth'
import * as userActions from '../../redux/modules/user'
import storage from '../../lib/storage'
import {isEmail, isLength, isAlphanumeric} from 'validator'; // 문자열 검증
import debounce from 'lodash/debounce';
// import sha256 from 'crypto-js/sha256';

class Register extends Component {
    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }
    validate = {
        email: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        id: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null); 
            return true;
        }
    }
    checkIDExists = debounce( async (id) => {
        const { AuthActions } = this.props;
        
        try {
            await AuthActions.checkIDExists({id});
            if(!this.props.exists.get('ID')) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
        
    }, 2000)
    handleLocalRegister = async () => {
        const { form, AuthActions,UserActions, error, history } = this.props;
        const { id, name, password, passwordConfirm } = form.toJS();

        const { validate } = this;

        if(error) return; // 현재 에러가 있는 상태라면 진행하지 않음
        if(!validate['id'](id) 
            || !validate['password'](password) 
            || !validate['passwordConfirm'](passwordConfirm)) { 
            // 하나라도 실패하면 진행하지 않음
            return;
        }

        try {
            await AuthActions.localRegister({
                id, name, password
            });
            const key = this.props.result.toJS()["Result"]
            if (key === "False") {
                const message =  '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
            history.push('/auth/login'); // 회원가입 성공시 홈페이지로 이동
        } catch(e) {
            // 에러 처리하기
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            this.setError('알 수 없는 에러가 발생했습니다.')
        }
    }    

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
         // 검증작업 진행
        //  const validation = this.validate[name](value);
        //  if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
        // TODO: 이메일, 아이디 중복 확인
        if(name==='id'){
            const check =  this.checkIDExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
            check(value);
        }
    }
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }
    render() {
        const { error } = this.props;
        const { id, name, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange, handleLocalRegister } = this;
        return (
            <AuthContent title="회원가입">
                <InputWithLabel label="이름" name="name" placeholder="이름" value={name} onChange={handleChange}/>
                <InputWithLabel label="아이디" name="id" placeholder="아이디" value={id} onChange={handleChange}/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={password} onChange={handleChange}/>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={passwordConfirm} onChange={handleChange}/>
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    }
}


export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exists: state.auth.getIn(['register', 'exists']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Register);