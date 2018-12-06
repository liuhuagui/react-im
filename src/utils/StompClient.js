import SockJS from 'sockjs-client';
import {over} from "webstomp-client";
import store from './Store';
import subscribers, {trackEmit} from './Subscribers';
import {chat} from './UrlConfig';

const {domain,action:{endPoint}} = chat;

const sockjs = new SockJS(domain+endPoint);

const StompClient = over(sockjs);

// 获得用户Id或者SessionId
var id = localStorage.getItem("id");
id = id?id:'test';

StompClient.connect(
   {id},
   frame => {//callBack
     subscribers.forEach(//遍历出订阅的队列，以及收到消息后的回调函数
        ({destination,callBack})=>StompClient.subscribe(destination,(message)=>callBack(message,store.dispatch))
     );
   },
  error =>{//errorBack
     store.dispatch({type:'ERROR',payload: trackEmit('连接失败')});
     console.log(error);
  }
);

export default StompClient;

