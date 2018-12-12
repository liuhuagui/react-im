import React from 'react';
import logo from '../../img/interface.png';
import userHeader from '../../img/user-header.png';
import consultantHeader from '../../img/consultant-header.png';
import top_right_header from '../../img/top_right_header.png'
import rect_strip from '../../img/rect_strip.png'
import '../../css/server-interface.css';
import ChatCore from './ChatCore';
import LeftNavigator from './LeftNavigator';
import { quickReply } from '../../utils/GlobalConfig';
import { generalFetch } from '../../utils/Utils';
import {regPrompt} from '../../utils/PayloadReg';

const { domain, action } = quickReply;

const getCurrentDiv = (v) => (
    <div className="body_center_first" style={{backgroundColor:'#f3f3f3'}}>
        <div className="body_center_first_header"><img alt="用户头像" src={userHeader} /></div>
        <div className="body_center_first_body">
            <div className="body_top">
                <div>当前客户</div>
                <div>{v[v.length - 1].date}</div>
            </div>
            <div className="body_bottom">
                {regPrompt(v[v.length - 1].payload)}
            </div>
        </div>
    </div>);

export default class ServerInterface extends React.Component {
    constructor(props) {
        super(props);

        this.addQuickReplyRef = React.createRef();
        this.openService = this.openService.bind(this);
        this.addQuickReply = this.addQuickReply.bind(this);
        this.sendQuickReply = this.sendQuickReply.bind(this);
    }

    componentDidMount() {
        this.props.updateQuickReplies();
    }

    openService = (e) => {
        if (!window.confirm('是否接入新的会话'))
            return;
        let toId = e.currentTarget.getAttribute('id');
        let payload = '请问，有什么可以帮到您的吗';
        this.props.sendMessage(payload, toId);
    }

    deleteQuickReply(e, id) {
        e.stopPropagation();
        if (!window.confirm('是否确定删除？'))
            return;
        generalFetch(
            domain + action.del,
            { id },
            ({ result }) => {
                if (result === 1)
                    this.props.updateQuickReplies();
            }
        );

    }

    displayContextMenu(e) {
        e.preventDefault();
        var menu = e.currentTarget.children[2];
        menu.style.display = "block";
        menu.style.right = "-60px";
        menu.style.top = "40px";
    }

    hideContextMenu(e) {
        var menu = e.currentTarget.children[2];
        menu.style.display = "none";
    }

    addQuickReply(e) {
        e.stopPropagation();//阻止冒泡传播
        var value = this.addQuickReplyRef.current.value;
        if (value.trim() === '') {
            alert('输入内容不能为空');
            return;
        }
        const managerId = window.localStorage.getItem('serverId');
        const content = value;
        
        generalFetch(
            domain + action.add,
            { managerId, content },
            ({ result }) => {
                if (result === 1) {
                    this.addQuickReplyRef.current.value = '';
                    this.props.updateQuickReplies();
                }
            }
        );
    }

    sendQuickReply(e) {
        if(!this.props.toId){
            alert('未指定聊天对象！');
            return;
        }
        var text = e.currentTarget.children[1].textContent;
        this.props.sendMessage(text, this.props.toId);
    }

    displayInput(e) {
        const { children } = e.currentTarget;
        e.currentTarget.style.backgroundColor = '#fff';
        children[0].style.display = 'none';
        children[1].style.display = 'none';
        children[2].style.display = 'flex';
    }

    render() {
        const { messages: { [this.props.toId]: currentMessages = [], sys: sysMessages = [], ...otherMessages }, sendMessage, quickReplies, toId } = this.props;

        if (currentMessages.length !== 0)
            var currentDiv = getCurrentDiv(currentMessages);

        const othersDiv = Object.entries(otherMessages)
            .sort(([, v1], [, v2]) => v2[v2.length - 1].date.localeCompare(v1[v1.length - 1].date))
            .map(([k, v], index) =>
                <div className="body_center_first" style={{backgroundColor:v[v.length - 1].of==='its'?'#dc4e2f':''}} key={k} id={k} onClick={this.openService}>
                    <div className="body_center_first_header"><img alt="用户头像" src={userHeader} /></div>
                    <div className="body_center_first_body">
                        <div className="body_top">
                            <div>{`客户${index}`}</div>
                            <div>{v[v.length - 1].date}</div>
                        </div>
                        <div className="body_bottom">
                            {regPrompt(v[v.length - 1].payload)}
                        </div>
                    </div>
                </div>
            );


        return (<div id="interface_main">
            <div id="interface_header">
                <div id="interface_header_left">
                    <img src={logo} alt="界面Logo" />
                    <p>客服平台</p>
                </div>
                <div id="interface_header_right">
                    <div id="header_right_first"><img src={top_right_header} alt="上传文件" /></div>
                    <div id="header_right_second"><p>快办客服</p></div>
                    <div id="header_right_third"><img src={rect_strip} alt="矩形条" /></div>
                </div>
            </div>
            <div id="interface_body" >
                <div id="body_left"><LeftNavigator /></div>
                <div id="body_center">
                    <div id="body_center_first">{currentDiv}{othersDiv}</div>
                    <div id="body_center_second">
                        <ChatCore contentHeight='590px' textInputHeight='160px'
                            myHeader={consultantHeader} itsHeader={userHeader}
                            {...{ toId, sendMessage, messages: [...currentMessages, ...sysMessages] }} />
                    </div>
                    <div id="body_center_third">
                        <span>快捷回复</span>
                        <div id="quick_reply">
                            {
                                JSON.stringify(quickReplies) !== '{}' && quickReplies.map(({ quickReplyId, content }) => (
                                    <div className="quick_reply_item" key={quickReplyId} id={quickReplyId}
                                        onClick={this.sendQuickReply}
                                        onContextMenu={this.displayContextMenu}
                                        onMouseLeave={this.hideContextMenu}>
                                        <div className="item_hidden"><span>{content}</span></div>
                                        <div className="item_content">{content}</div>
                                        <div onClick={(e) => this.deleteQuickReply.bind(this, e, quickReplyId)()}><span>删除</span></div>
                                    </div>
                                ))
                            }
                            <div className="add_quick_reply" onClickCapture={this.displayInput}>
                                <div className="add_quick_reply_align"></div>
                                <div className="add_quick_reply_justify"></div>
                                <div className="add_quick_reply_input">
                                    <input type="text" ref={this.addQuickReplyRef} />
                                    <button onClick={this.addQuickReply}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
