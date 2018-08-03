import React, { Component } from 'react';
import './Login.css';
import {LoginDisplay} from './LoginDisplay';
import { signInWithGoogle, signInWithFacebook, logInWithEmail } from '../../services/firebase';
import toastr from 'toastr'

class Login extends Component {

    componentWillMount(){
        this.getUser()
    }

    getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) this.props.history.push('/profile')
    }

    googleLogin = () => {
        signInWithGoogle()
        .then(user=>{
            this.props.history.push('/profile')
        })
        .catch(e=>{
            console.log(e)
            toastr.error(e.message)
        })
    }

    facebookLogin = () => {
        signInWithFacebook()
        .then(user=>{
            this.props.history.push('/profile')
        })
        .catch(e=>{
            console.log(e)
            toastr.error(e.message)
        })
    }

    emailLogin = (e) => {
        e.preventDefault()
        const auth = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        logInWithEmail(auth)
        .then(user=>{
            this.props.history.push('/profile')
        })
        .catch(e=>{
            console.log(e)
            toastr.error(e.message)
        })
        
    }

    render() {
        return (
            <div className="login">
                <LoginDisplay 
                emailLogin={this.emailLogin}
                facebookLogin={this.facebookLogin}
                googleLogin={this.googleLogin} />
            </div>
        );
    }
}

export default Login;
