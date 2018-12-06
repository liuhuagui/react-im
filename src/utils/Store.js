import {createStore} from 'redux';
import reducers, {init_state} from './Reducers';

const store = createStore(reducers,init_state);


export default store;