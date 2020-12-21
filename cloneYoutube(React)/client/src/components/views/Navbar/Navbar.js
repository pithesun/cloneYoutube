import React from 'react';
import axios from 'axios';
//import { USER_SERVER } from '../../../config';
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useSelector} from 'react-redux';
import './Section/Navbar.css';
import { withRouter } from 'react-router-dom';
import StartHeader from './Section/StartHeader'
function Navbar(props) {
        //
        const user = useSelector(state => state.user);
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
        if (user.userData && !user.userData.isAuth) {
            return (
                <>
                    <header className="sticky">
                        <StartHeader/>
                        <div className="end">
                            <a href="/login">
                                    sign in
                            </a>
                            <a href="/register">
                                    sign up
                            </a>
                        </div>
                    </header>
                    
                </>
            )
        } else {
            return (
                <>
                    <header>
                        <StartHeader/>
                        <div className="end">
                            <a href="/video/upload">
                            <button>
                                    <FontAwesomeIcon icon= {faVideo} className="icon"
                                    />
                            </button>
                            </a>
                                <a onClick={onLogoutHandler}>Logout</a>
                            </div>
                    </header>
                </>
            )
        }
}

export default withRouter(Navbar)
