import { connect } from 'react-redux';
import buildStomp from '../../utils/BuildStomp';
import { trackEmit } from '../../utils/Reducers';
import { chat, quickReply } from '../../utils/GlobalConfig';
import { generalFetch } from '../../utils/Utils';

/**
 * 创建容器组件
 * @param {String} id 用作用户认证的user-name
 * @param {React.Component} uiComponent UI组件
 */
const buildContainer = (id, uiComponent) => {
    const stomp = buildStomp(chat.domain + chat.action.endPoint, id);
    //Store's Listener: state to propsbn
    const mapStateToProps = (state) => ({
        messages: state.messages,
        toId: state.toId,
        quickReplies: state.quickReplies
    });
    //dispatch to props
    const mapDispatchToProps = (dispatch) => ({
        sendMessage: (payload, toId) => {
            dispatch({ type: 'SEND', payload: trackEmit(payload, toId) });
            stomp.stompClient.send('/consultant/private', JSON.stringify({ payload }), { toId });
        },
        updateQuickReplies(managerId = id) {
            generalFetch(
                quickReply.domain + quickReply.action.get,
                { managerId },
                ({ result, data }) => {
                    if (result === 1)
                        dispatch({ type: 'UPDATE', data });
                }
            );
        }
    });

    stomp.stompConnect();
    return connect(mapStateToProps, mapDispatchToProps)(uiComponent);
};

export default buildContainer;