import React, {Component} from 'react'
import HeaderContainer from './containers/Base/HeaderContainer';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Page from './pages/Pages'
import * as userActions from './redux/modules/user'
import storage from './lib/storage';
class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo')
    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    
    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
        await UserActions.checkStatus();
    } catch (e) {
        storage.remove('loggedInfo');
        window.location.href = '/auth/login?expired';
    }
}

componentDidMount() {
    this.initializeUserInfo();
}
  render(){
    
    return (
        <div> 
          <HeaderContainer/>
          <Page></Page>
        </div>
    );
  }
}
export default connect(
  (state) => ({
    user: state.user
  }),
  (dispatch) => ({
      UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);