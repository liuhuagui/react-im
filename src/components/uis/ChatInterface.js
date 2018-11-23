import React from 'react';
import logo from '../../img/interface.png';
import consultant_header from '../../img/consultant-header.png'
import '../../css/chatinterface.css';

export default class ChatInterface extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="interface_main">
            <div id="interface_header">
                <div id="interface_header_left">
                    <img src={logo} />
                    <p>客服平台</p>
                </div>
                <div id="interface_header_right">
                    <img src={consultant_header} />
                    <p>在线客服</p>
                </div>
            </div>
        </div>
    }
}