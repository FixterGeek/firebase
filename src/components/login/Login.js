import React, { Component } from 'react';
import './Login.css';
import {LoginDisplay} from './LoginDisplay';
import { signInWithGoogle, signInWithFacebook, logInWithEmail } from '../../services/firebase';
import toastr from 'toastr'
import queryString from 'query-string'

class Login extends Component {

    componentDidMount () {
        window.scroll(0, 0)
        this.getUser()
    }

    decideRoute = () => {
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed)
        if(parsed.next) return this.props.history.push(parsed.next)
        this.props.history.push('/profile')
    }

    getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) this.props.history.push('/profile')
    }

    googleLogin = () => {
        signInWithGoogle()
        .then(user=>{
            this.decideRoute()
        })
        .catch(e=>{
            console.log(e)
            toastr.error(e.message)
        })
    }

    facebookLogin = () => {
        signInWithFacebook()
        .then(user=>{
            this.decideRoute()
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
            this.decideRoute()
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
