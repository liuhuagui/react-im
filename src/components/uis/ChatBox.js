import React from 'react';
import '../../css/chatbox.css';
import logo from '../../img/logo.png';
import close from '../../img/close.png';
import minus from '../../img/minus.png';
import emoj from '../../img/emoj.png';
import picture from '../../img/picture.png';
import file from '../../img/file.png';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import EmojiPicker from './EmojiPicker';
import { Emoji } from 'emoji-mart'

class ChatBox extends React.Component {

    static regEmoji=/<E:([^>]*)>/;
    
    constructor(props) {
        super(props);
        this.areaRef = React.createRef();
        this.scrollRef = React.createRef();

        this.sendEmoji = this.sendEmoji.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.sendMessage0 = this.sendMessage0.bind(this);
    }

    componentDidMount(){
        let scrollDom = this.scrollRef.current;
        scrollDom.scrollTop = scrollDom.scrollHeight;
    }


    componentDidUpdate(){
        let scrollDom = this.scrollRef.current;
        scrollDom.scrollTop = scrollDom.scrollHeight;
    }

    sendEmoji(emoji){
        this.props.sendMessage(`<E:${emoji.id}>`);
    }

    regEmoji=(emojiStr)=>{
       var  emojiInfo=emojiStr.match(ChatBox.regEmoji);
       return emojiInfo==null?emojiStr:<Emoji emoji={emojiInfo[1]} size={64} set='messenger'/>;
    }

    sendMessage(e){
       e.preventDefault();
       let value= this.areaRef.current.value;
       if(value.trim() === ''){
           alert('输入内容不能为空');
           return;
       }
       this.props.sendMessage(value);
       this.areaRef.current.value = '';
    }

    sendMessage0(e){
        // e.preventDefault();//注意这里keydown就不要阻止默认事件了，否则没法输入
        if(!(e.ctrlKey===true&&e.keyCode===13))//ctrl+enter发送
          return;
        let value= this.areaRef.current.value;
        if(value.trim() === ''){
            alert('输入内容不能为空');
            return;
        }
        this.props.sendMessage(value);
        this.areaRef.current.value = '';
     }

    render() {
        const {messages} = this.props;

        return <Draggable handle=".handle">
        <div id="box">
            <div id="header" className="handle">
                <div id="header-left">
                    <img src={logo} />
                    <p>在线客服</p>
                </div>
                <div id="header-right">
                    <Link to="/"><img src={minus} /></Link>
                    <Link to="/"><img src={close} /></Link>
                </div>
            </div>
            <div id="buttom">
                <div id="left">
                    <div id="content" ref={this.scrollRef}>
                      <div id="content-internal">
                      {
                         messages.map(({of,date,payload},index)=>(
                             <div className={of} key={date+index}>
                                <div className="info">{this.regEmoji(payload)}</div>
                             </div>
                         ))
                      }
                     </div>
                    </div>
                    <div id="tools">
                        <div id="tools-content">
                            <div id="emoj"><img  src={emoj} /><EmojiPicker id="emoji-picker" selectFuntion={this.sendEmoji} /></div>
                            <div id="picture"><img  src={picture} /></div>
                            <div id="file"><img  src={file} /></div>
                        </div>
                    </div>
                    <div id="textInput">
                        <form>
                            <textarea id="text-area" ref={this.areaRef} autoFocus onKeyDown={this.sendMessage0}>

                            </textarea>
                        </form>
                    </div>
                    <div id="buttonInput">
                        <p>按ctrl+enter发送</p>
                        <button type="button" onClick={this.sendMessage} >发送</button>
                    </div>
                </div>
                <div id="right">
                    <p id="article-title">关于企业</p>
                    <p id="article">快办网“一站式孵化服务平台”是佺三台集团旗下平台。集团共12家子公司，业务遍布白俄罗斯、马来西亚、加拿大及中国，于2014年正式运营，注册资金500万元人民币。平台为行业创新创业人才以及转型升级企业提供全方位孵化服务，包括创业孵化服务、企业孵化服务、产业孵化服务，致力于扶持广大中小企业良性发展，帮助企业更好的成长，成为具有中国影响力的互联网企业孵化服务平台！</p>
                </div>
            </div>
        </div></Draggable>;
    }
}


export default ChatBox;