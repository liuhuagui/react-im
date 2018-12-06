import { connect } from 'react-redux';
import StompClient from '../../utils/StompClient';
import VisitorInterface from '../uis/VisitorInterface';
import ServerInterface from '../uis/ServerInterface';
import { trackEmit } from '../../utils/Reducers';
import { quickReply } from '../../utils/UrlConfig';
import {form} from '../../utils/Utils';

const { domain, action } = quickReply;

//Store's Listener: state to props
function mapStateToProps(state) {
    return {
        messages: state.messages,
        toId: state.toId,
        quickReplies: state.quickReplies
    };
}

//dispatch to props
function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (payload, toId) => {
            dispatch({ type: 'SEND', payload: trackEmit(payload, toId) });
            StompClient.send('/consultant/private', JSON.stringify({ payload }), { toId });
        },
        updateQuickReplies(managerId = 'test') {
            fetch(domain + action.get, {
                method: 'post',
                body: form({managerId})
            }).then((response) => {
                if (response.ok)
                    return response.json();
                throw new Error(`Request is failed, status is ${response.status}`);
            }).then(({ result, data }) => {
                if (result === 1)
                    dispatch({ type: 'UPDATE', data });
            }, (error) => {
                console.error(error);
            });
        }
    };
}

const ChatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
    // )(VisitorInterface);
)(ServerInterface);

export default ChatContainer;