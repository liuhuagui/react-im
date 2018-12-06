 import {trackReceive} from './Reducers';

 /**
  * 用于STOMP的订阅者集合，元素为对象，包含两个基本属性：
  * @param {String} destination 要订阅的目的地
  * @param {Function} callBack  收到响应后的回调函数
  */
 const subscribers = [
     //订阅用户队列
     {  
        destination:'/user/topic/privates',
        callBack: (msg,dispatch) => {
            dispatch({type:'RECEIVE',payload: trackReceive(JSON.parse(msg.body))});
        }
     }
 ];

 export default subscribers;

 export {trackEmit} from './Reducers';