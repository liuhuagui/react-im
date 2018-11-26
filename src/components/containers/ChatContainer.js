import {connect} from 'react-redux';
import StompClient from '../../utils/StompClient';
import VisitorInterface from '../uis/VisitorInterface';
import ServerInterface from '../uis/ServerInterface';

//Store's Listener: state to props
function mapStateToProps(state){
    return {
            messages:state.messages
           };
}

//获取使用者类型
var type = localStorage.getItem("type");

//dispatch to props
function mapDispatchToProps(dispatch){
    return {
             sendMessage: (payload,toId = 'test') => {
                 dispatch({type:'SEND',payload});
                 StompClient.send('/consultant/private',JSON.stringify({payload}),{toId});
             }
           };
}

const ChatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(VisitorInterface);
// )(type?VisitorInterface:ServerInterface);

export default ChatContainer;