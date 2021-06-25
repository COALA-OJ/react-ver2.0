import React, { Children, Component } from 'react';
import Header, {UserButton ,LoginButton , RegisterButton} from '../../components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from '../../redux/modules/user'
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import storage from '../../lib/storage';
import { changeInput } from '../../redux/modules/auth';
import { Power, User } from 'grommet-icons';
import { Menu } from 'grommet';
// 중간 여백
const Span = styled.span`
    padding-left : 20px
`;
class HeaderContainer extends Component {
    handleLogout = async () => {
        const { UserActions } = this.props;
        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/'; // 홈페이지로 새로고침
    }
    
    render() {
        const { visible, user } = this.props;
        
        if(!visible) return null;
        return (
            <Header>
            { user.get('logged') 
                ? (<div>
                    <Menu
                        label= {user.getIn(['loggedInfo', 'ID']) +" 님"}
                        items={[
                            { label: 'Profile', gap: 'small' ,icon: <User  />, onClick: () => {} },
                            { label: 'Logout', gap: 'small' ,icon: <Power />, onClick : this.handleLogout}
                        ]}
                        />
                </div>)
                :
                <div>
                <RegisterButton /><Span/><LoginButton/> 
                </div> 
            }
        </Header>
        );
    }
}


export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);