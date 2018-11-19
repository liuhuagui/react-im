import {connect} from 'react-redux';
import StompClient from '../../utils/StompClient';
import ChatBox from '../uis/ChatBox';

function mapStateToProps(state){
    return {
            messages:state.messages
           };
}

//目标Id
var  toId = sessionStorage.getItem('toId');
toId = toId?toId:'test';
function mapDispatchToProps(dispatch){
    return {
             sendMessage: payload => {
                 dispatch({type:'SEND',payload});
                 StompClient.send('/consultant/private',JSON.stringify({payload}),{toId});
             }
           };
}

const ChatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox);

export default ChatContainer;