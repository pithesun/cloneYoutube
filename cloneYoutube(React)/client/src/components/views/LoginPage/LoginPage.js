import React, { useState } from 'react';

//dispatch를 이용해서 action을 취함 
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        //target, currentTarget
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        //target, currentTarget
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {

        //page refresh 되는 것을 방지해줌
        event.preventDefault();

        let body = {
            email: Email,
            password: Password,
        }

        //상태 업데이트
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){ // 다른 페이지 이동
                props.history.push('/') // React Router Dom을 이용한 것
            } else{
                alert('Error');
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
