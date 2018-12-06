import React from 'react';
import { Provider } from 'react-redux';
import ChatContainer from '../components/containers/ChatContainer';
import Dial from './uis/Dial';
import { Route, HashRouter} from 'react-router-dom';

const ChatApp = (props) => (
    <Provider {...props}>
        <HashRouter>
            <div>
                <Route exact path="/" component={Dial} />
                <Route path="/chat" component={ChatContainer} />
            </div>
        </HashRouter>
    </Provider>
);

export default ChatApp;