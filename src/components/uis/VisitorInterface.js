import React from 'react';
import '../../css/visitor-interface.css';
import logo from '../../img/logo.png';
import close from '../../img/close.png';
import minus from '../../img/minus.png';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import ChatCore from './ChatCore';

export default (props) => {
    const { messages: { [props.toId]: currentMessages=[], sys: sysMessages=[]}, ...otherProps} = props;
    const toId = props.toId?props.toId:'kuaiban';
    
    return (<Draggable handle=".handle">
    <div id="box">
        <div id="header" className="handle">
            <div id="header-left">
                <img src={logo} alt="Logo"/>
                <p>在线客服</p>
            </div>
            <div id="header-right">
                <Link to="/"><img src={minus} alt="最小化"/></Link>
                <Link to="/"><img src={close} alt="关闭"/></Link>
            </div>
        </div>
        <div id="bottom">
            <div id="left"><ChatCore {...{messages:[...currentMessages,...sysMessages], ...otherProps, toId}} /></div>
            <div id="right">
                <p id="article-title">关于企业</p>
                <p id="article">快办网“一站式孵化服务平台”是佺三台集团旗下平台。集团共12家子公司，业务遍布白俄罗斯、马来西亚、加拿大及中国，于2014年正式运营，注册资金500万元人民币。平台为行业创新创业人才以及转型升级企业提供全方位孵化服务，包括创业孵化服务、企业孵化服务、产业孵化服务，致力于扶持广大中小企业良性发展，帮助企业更好的成长，成为具有中国影响力的互联网企业孵化服务平台！</p>
            </div>
        </div>
    </div>
</Draggable>);
}