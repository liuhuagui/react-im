 import store from './Store';
 
 const subscribers = [
     //订阅用户队列
     {  
        destination:'/user/topic/privates',
        callBack: rsp => {
            store.dispatch({type:'RECEIVE',payload:JSON.parse(rsp.body).payload});
        }
     }
 ];

 export default subscribers;