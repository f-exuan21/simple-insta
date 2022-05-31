import React from 'react';
import './Login.css';
import { Button } from 'reactstrap';

const Login = () => {
    return (
        <div className="LoginPage">
            <div className="Box">
                <div className="imgBox">
                    <img
                        src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                        alt="Logo"
                    />
                </div>
                <div className="LoginBox">
                    <input type="text" placeholder="Id" />
                    <input type="password" placeholder="Password" />
                    <Button color="primary">로그인</Button>
                </div>
            </div>
            <div className="Box">
                <p>
                    계정이 없으신가요?
                    <a href="/">가입하기</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
