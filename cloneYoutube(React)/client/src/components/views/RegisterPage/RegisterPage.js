import React, { useState } from 'react';

//dispatch를 이용해서 action을 취함 
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    
    const onEmailHandler = (event) => {
        //target, currentTarget
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        //target, currentTarget
        setPassword(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        //target, currentTarget
        setName(event.currentTarget.value);
    }

    const onComfirmPasswordHandler = (event) => {
        //target, currentTarget
        setConfirmPassword(event.currentTarget.value);
    }


    const onSubmitHandler = (event) => {

        //page refresh 되는 것을 방지해줌
        event.preventDefault();

        //비밀번호와 비밀번호 확인 일치
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        }

        //redux를 쓰지 않으면 Axios로 
        //Axios.post~~

        //상태 업데이트, 액션 날리기
        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){ // 다른 페이지 이동
                props.history.push('/login')
            } else{
                alert('Failed to sign up');
            }
        })
    }

    return (
        <div style= {{display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style= {{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onComfirmPasswordHandler} />
                <br />
                <button>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
