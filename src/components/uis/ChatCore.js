import React from 'react';
import '../../css/chatcore.css';
import emoj from '../../img/emoj.png';
import picture from '../../img/picture.png';
import file from '../../img/file.png';
import EmojiPicker from './EmojiPicker';
import { regPayload } from '../../utils/PayloadReg';
import FileUpload from './FileUpload';

export default class ChatCore extends React.Component {
    constructor(props) {
        super(props);
        this.areaRef = React.createRef();
        this.scrollRef = React.createRef();

        this.sendEmoji = this.sendEmoji.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.sendMessage0 = this.sendMessage0.bind(this);
    }

    componentDidMount() {
        this.scrollEnd();
    }

    componentDidUpdate() {
        this.scrollEnd();
    }

    scrollEnd = () => {
        let scrollDom = this.scrollRef.current;
        scrollDom.scrollTop = scrollDom.scrollHeight;
    }

    sendEmoji(emoji) {
        this.props.sendMessage(`<E:${emoji.id}>`);
    }

    sendMessage(e) {
        e.preventDefault();
        let value = this.areaRef.current.value;
        if (value.trim() === '') {
            alert('输入内容不能为空');
            return;
        }
        this.props.sendMessage(value);
        this.areaRef.current.value = '';
    }

    sendMessage0(e) {
        // e.preventDefault();//注意这里keydown就不要阻止默认事件了，否则没法输入
        if (!(e.ctrlKey === true && e.keyCode === 13))//ctrl+enter发送
            return;
        let value = this.areaRef.current.value;
        if (value.trim() === '') {
            alert('输入内容不能为空');
            return;
        }
        this.props.sendMessage(value);
        this.areaRef.current.value = '';
    }

    render() {
        const {contentHeight, textAreaHeight, messages, sendMessage} = this.props;

        return <div id="chat_core_body">
            <div id="content" ref={this.scrollRef} style={{height:contentHeight}}>
                <div id="content-internal">
                    {
                        messages.map(({ of, date, payload }, index) => (
                            <div className={of} key={date + index}>
                                <div className="info">{regPayload(payload, this.scrollEnd)}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id="tools">
                <div id="tools-content">
                    <div id="emoj"><img src={emoj} alt="表情包"/><EmojiPicker id="emoji-picker" selectFuntion={this.sendEmoji} /></div>
                    <FileUpload id="picture" accept="image/*" sendMessage={sendMessage} url="http://192.168.1.69" action="/upload">
                        <img src={picture} alt="上传图片"/>
                    </FileUpload>
                    <FileUpload id="file" sendMessage={sendMessage} url="http://192.168.1.69" action="/upload" >
                        <img src={file} alt="上传文件"/>
                    </FileUpload>
                </div>
            </div>
            <div id="textInput">
                <form>
                    <textarea id="text-area" ref={this.areaRef} autoFocus onKeyDown={this.sendMessage0} style={{height:textAreaHeight}}>

                    </textarea>
                </form>
            </div>
            <div id="buttonInput">
                <p>按ctrl+enter发送</p>
                <button type="button" onClick={this.sendMessage} >发送</button>
            </div>
        </div>;
    }
}