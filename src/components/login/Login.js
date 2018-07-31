import React, { Component } from 'react';
import './Login.css';
import {LoginDisplay} from './LoginDisplay';
//import FontAwesome from 'react-fontawesome';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <LoginDisplay />

            </div>
        );
    }
}

export default Login;
