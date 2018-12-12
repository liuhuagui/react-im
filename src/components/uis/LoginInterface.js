import React from 'react';
import '../../css/login-interface.css';
import chairs from '../../img/chairs.png';
import blueLogo from '../../img/blue_logo.png';
import {globalState,quickReply} from '../../utils/GlobalConfig';
import {generalFetch} from '../../utils/Utils';

const {domain,action} = quickReply;

export default (props) => {

    const managerIdRef = React.createRef();
    const passWordRef = React.createRef();
    
    function toLogin(){
       const managerId = managerIdRef.current.value;
       const passWord = passWordRef.current.value;
       
       if(managerId.trim() === '' || passWord.trim() === ''){
           alert('账户或密码为空');
           return;
       }
      
       generalFetch(
          domain+action.toLogin,
          {managerId,passWord},
          ({result}) => {
             if (result === 1){
                 window.localStorage.setItem('serverId',managerId);
                 globalState.isLogin = true;
                 props.history.push('/server');
             }
          }
       );
    }

    return (<div id="login_interface_main">
            <div id="login_interface_left">
                <img alt="chairs" src={chairs} />
            </div>
            <div id="login_interface_right">
                <img alt="Logo" src={blueLogo} />
                <div id="login_interface_right_form">
                    <div id="right_form_top">
                        <h1>log in</h1>
                        <span className="welcome_to_login">欢迎登陆</span>
                    </div>
                    <div id="right_form_bottom">
                        <input ref={managerIdRef} type="text" />
                        <input ref={passWordRef} type="password" />
                        <button onClick={toLogin}>登陆</button>
                        <span>快办客服平台</span>
                    </div>
                </div>
            </div>
    </div>);
    
}