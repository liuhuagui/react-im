import SockJS from 'sockjs-client';
import { over } from "webstomp-client";
import store from './Store';
import subscribers, { trackEmit } from './Subscribers';

/**
 * 建立STOMP连接，返回一个普通对象，持有两个属性stompClient，stompConnect()
 * @param {String} url endPoint的地址，必需
 * @param {String} id 用作用户认证的username，必需
 * @param {Function} callBack  连接成功的回调函数，可选
 * @param {Function} errorBack  连接失败的回调函数，可选
 */
const buildStomp = (url, id, callBack, errorBack) => {
  const sockjs = new SockJS(url);
  const stompClient = over(sockjs);
  return {
            stompClient,
            stompConnect() {
              stompClient.connect(
                { id },
                callBack || (frame => {
                  subscribers.forEach(//遍历出订阅的队列，以及收到消息后的回调函数
                    ({ destination, callBack }) => stompClient.subscribe(destination, (message) => callBack(message, store.dispatch))
                  );
                }),//callBack
                errorBack || (error => {
                  store.dispatch({ type: 'ERROR', payload: trackEmit('连接失败') });
                  console.log(error);
                })//errorBack
              );
            }
       };
};

export default buildStomp;

