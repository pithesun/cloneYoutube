import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {

    /* option */
    //null => 아무나 출입 가능
    //true => 로그인한 유저 출입 가능
    //false => 로그인한 유저 출입 불가능
    function AuthenticationCheck(props){
        
        const dispatch = useDispatch();

        useEffect(() => {
            //백엔드에서 request를 날려 상태를 가져옴
            dispatch(auth()).then(response => {
                console.log(response)

                //분기 처리
                if(!response.payload.isAuth){
                    //로그인 하지 않은 상태
                    if(option){
                        props.history.push('/login');
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){ //권한 필요한 페이지 접근 시
                        props.history.push('/');
                    }else{
                        if(!option){
                            props.history.push('/');
                        }
                    }
                }
            });
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}