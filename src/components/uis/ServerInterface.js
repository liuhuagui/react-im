import React from 'react';
import logo from '../../img/interface.png';
import top_right_header from '../../img/top_right_header.png'
import rect_strip from '../../img/rect_strip.png'
import '../../css/server-interface.css';
import ChatCore from './ChatCore';

export default (props) => (<div id="interface_main">
    <div id="interface_header">
        <div id="interface_header_left">
            <img src={logo} alt="界面Logo"/>
            <p>客服平台</p>
        </div>
        <div id="interface_header_right">
            <div id="header_right_first"><img src={top_right_header} alt="上传文件"/></div>
            <div id="header_right_second"><p>快办客服</p></div>
            <div id="header_right_third"><img src={rect_strip} alt="矩形条"/></div>
        </div>
    </div>
    <div id="interface_body" >
        <div id="body_first"></div>
        <div id="body_second"></div>
        <div id="body_third"><ChatCore {...props}/></div>
        <div id="body_fourth"></div>
    </div>
</div>);
