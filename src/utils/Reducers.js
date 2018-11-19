import { combineReducers } from 'redux';

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
    messages(olds = [{of:'my',date:'2013-6-5',payload:'你是谁啊？'}],{type,payload}){
        switch (type) {
            case 'SEND':
                return [...olds,{of:'my',date:new Date().toLocaleString(),payload}];
            case 'RECEIVE':
                return [...olds,{of:'its',date:new Date().toLocaleString(),payload}];
            case 'ERROR':
                return [...olds,{of:'sys',date:new Date().toLocaleString(),payload}];  
            default:
                return olds;
        }
    }
};

const reducers = combineReducers(allReducers);

export default reducers;