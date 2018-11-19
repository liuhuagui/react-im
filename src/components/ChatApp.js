import React from 'react';
import { Provider } from 'react-redux';
import ChatContainer from '../components/containers/ChatContainer';
import Dial from './uis/Dial';
import { Route, HashRouter,Switch } from 'react-router-dom';

const ChatApp = (props) => (
    <Provider {...props}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Dial} />
                <Route path="/chat" component={ChatContainer} />
            </Switch>
        </HashRouter>
    </Provider>
);

export default ChatApp;