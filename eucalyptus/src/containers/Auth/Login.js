import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../../components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../redux/modules/auth'
import * as userActions from '../../redux/modules/user'
import storage from '../../lib/storage'
import queryString from 'query-string';

class Login extends Component {
    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'login',
            message
        });
        return false;
    }
    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }
    handleLocalLogin = async () => {
        const { form, AuthActions, UserActions, history,user } = this.props;
        const { id, password } = form.toJS();

        try {
            await AuthActions.localLogin({id, password});
            const loggedInfo = this.props.result.toJS();
            if (loggedInfo['Result'] === 'False') {
                this.setError('잘못된 계정정보입니다.');
                return;
            }
            UserActions.setLoggedInfo(loggedInfo);
            storage.set('loggedInfo', loggedInfo);
            storage.set(['Id'], loggedInfo['ID']);
            // console.log(loggedInfo)
            // console.log(user.get('logged'))
            history.push('/');
            
        } catch (e) {
            this.setError('잘못된 계정정보입니다.');
        }
    }

    componentWillUnmount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined) {
            this.setError('세션에 만료되었습니다. 다시 로그인하세요.')
        }
    }
    render() {
        const { id, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { handleChange, handleLocalLogin } = this;
        const { error } = this.props;

        return (
            <AuthContent title="로그인">
                <InputWithLabel label="아이디" name="id" placeholder="아이디" value={id} onChange={handleChange}/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"  value={password} onChange={handleChange}/>
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
            </AuthContent>
        );
    }
}
export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login', 'error']),
        result: state.auth.get('result'),
        user: state.user
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Login);