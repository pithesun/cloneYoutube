import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)
    
    //reduce로 보내기
    //reducer : a function describing how the application's state changes
    //(previousState, action ) =? nextState

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    //node 서버(App.js)의 엔드포인트가 같아야 함.
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)
    
    //reduce로 보내기
    //reducer : a function describing how the application's state changes
    //(previousState, action ) =? nextState

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit){

    //node 서버(App.js)의 엔드포인트가 같아야 함.
    const request = axios.get('/api/users/auth', dataToSubmit)
    .then(response => response.data)
    
    //reduce로 보내기
    //reducer : a function describing how the application's state changes
    //(previousState, action ) =? nextState

    return {
        type: AUTH_USER,
        payload: request
    }
}
