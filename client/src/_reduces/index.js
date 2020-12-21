// reducer: state 변화를 관찰하고 리턴해준다 => 여러 개의 Reducer
// combinereducer를 사용해서 rootReducer에서 합쳐준다.
import { combineReducers } from 'redux';
import user from './user_reducer'; 

const rootReducer = combineReducers({
    user
})

export default rootReducer;