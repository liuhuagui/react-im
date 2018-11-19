import {createStore} from 'redux';
import reducers from './Reducers';

const init_state = {
    messages:[{of:'my',date:'2013-6-5',payload:'你是谁啊？'}]
};

const store = createStore(reducers,init_state);


export default store;