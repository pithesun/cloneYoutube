import React, {useEffect} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';


function LandingPage(props) {

    //랜딩페이지에 들어오자마자 실행 
    //get request를 서버로 보냄
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    const onLogoutHandler = () => {
        axios.get('/api/users/logout') //body 없이 준다.
        .then(response => {
            if(response.data.success){
                props.history.push('/login');
            }else{
                alert('로그아웃 하는데 실패했습니다.');
            }
        })
    }

    return (
        <div style= {{display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', width: '100%', height: '100vh'}}>
            <h2>LandingPage</h2>
        </div>
    )
}

export default withRouter(LandingPage)
