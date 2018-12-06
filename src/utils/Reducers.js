import { combineReducers } from 'redux';

/**
 * 为发出的内容增加时间戳标记
 * @param {String} payload 内容
 * @param {String} toId 发送目标
 */
export const trackEmit = (payload,toId) => ({payload,toId,date:new Date().toLocaleString()});

/**
 * 把接收到的Message.body（转成对象后）解析处理并增加时间戳标记
 * @param {Object} param0 Message.body（转成对象后）
 */
export const trackReceive = ({payload,fromId}) =>({payload,fromId,date:new Date().toLocaleString()});


/**
 * 这里使用`计算属性名称`来初始化对象。
 * 可参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
 */
const messages =  {
    // ['test']: [{of:'my|its|sys',date:'2013-6-5',payload:'你是谁啊？'}]
};  

export const init_state = {
    messages, //消息记录
    toId: ''//会话对象
};

/**
 * 虽然 combineReducers 自动帮你检查 reducer 是否符合以上规则，但你也应该牢记，
 * 并尽量遵守。即使你通过 Redux.createStore(combineReducers(...), initialState)
 * 指定初始 state，combineReducers 也会尝试通过传递 undefined 的 state 来检测你的
 * reducer 是否符合规则。因此，即使你在代码中不打算实际接收值为 undefined 的 state，
 * 也必须保证你的 reducer 在接收到 undefined 时能够正常工作。
 * 
 * 详情可见：https://www.redux.org.cn/docs/api/combineReducers.html
 */
const allReducers = {
    messages(olds = messages,{type,payload={}}){
        const {toId,fromId,...others} = payload;
        //注意：在数组中使用Spread syntax（扩展语法）注意要判 `null | undefined`
        //参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Only_for_iterables
        switch (type) {
            case 'SEND':
                return {...olds,[toId]:[...(olds[toId]?olds[toId]:[]),{of:'my',...others}]};
            case 'RECEIVE':
                return {...olds,[fromId]:[...(olds[fromId]?olds[fromId]:[]),{of:'its',...others}]};
            case 'ERROR':
                return {...olds,sys:[...(olds.sys?olds.sys:[]),{of:'sys',...others}]};  
            default:
                return olds;
        }
    },
    toId(old = '',{type,payload}){
      if(type === 'SEND')
        return payload.toId;
      return old;
    },
    quickReplies(old = {}, {type,data}){
      if(type === 'UPDATE')
        return data;
      return old;
    }
};

const reducers = combineReducers(allReducers);

export default reducers;

