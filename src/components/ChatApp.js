import React from 'react';
import { Provider } from 'react-redux';
import buildContainer from '../components/containers/buildContainer';
// import Dial from './uis/Dial';
// import VisitorInterface from './uis/VisitorInterface';
import ServerInterface from './uis/ServerInterface';
import LoginInterface from './uis/LoginInterface';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';
import {globalState} from "../utils/GlobalConfig";

// //客户端代码
// var id = window.localStorage.getItem('visitorId');
// if (!id) {
//     id = Date.now().toString().substring(5);
//     window.localStorage.setItem('visitorId', id);
// }
// const Container = buildContainer(id, VisitorInterface);

// const ChatApp = (props) => (
//     <Provider {...props}>
//         <HashRouter>
//             <Switch>
//                 <Route exact path="/" component={Dial}/>
//                 <Route path="/visitor" component={Container}/>
//                 <Redirect to="/" from="*" />
//             </Switch>
//         </HashRouter>
//     </Provider>
// );

//服务端代码
const ChatApp = (props) => (
    <Provider {...props}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={LoginInterface}/>
                <Route path="/server" render={({history}) => {
                    if(globalState.isLogin){
                        if(globalState.Component)
                         return <globalState.Component />;
                        const id = window.localStorage.getItem('serverId');
                        if(id){
                            globalState.Component = buildContainer(id, ServerInterface);
                            return <globalState.Component />;
                        }
                        console.error('serverId 不存在');
                    }
                    history.push('/');
                    return null;
                }}/>
                <Redirect to="/" from="*" />
            </Switch>
        </HashRouter>
    </Provider>
);

export default ChatApp;