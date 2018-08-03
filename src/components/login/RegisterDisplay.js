import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom'
import { signInWithGoogle, signInWithFacebook, signInWithEmail } from '../../services/firebase';
import toastr from 'toastr'

export class RegisterDisplay extends React.Component {
    
    state = {
        errors:{}
    }

    signUpWithEmail = (e) => {
        e.preventDefault()
        const auth = {
            displayName: e.target.displayName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password2: e.target.password2.value
        }
        if(this.validateForm(auth)){
            signInWithEmail(auth)
            .then(user=>{
                this.props.history.push('/profile')
            })
            .catch(e=>{
                console.log(e)
                toastr.error(e.message)
            })
        }
        return
    }

    validateForm = (auth) =>{
        let noErrors = true
        const errors = {}
        this.setState({errors})
        if(auth.password !== auth.password2 || !auth.password || !auth.password2){
            errors.password = "Tu password no coincide"
            noErrors = false
        }
        if(!auth.email.includes('@')){
            errors.email = "Introduce un correo electrónico real"
            noErrors = false
        }
        if(auth.displayName.length < 4){
            errors.displayName = "Tu nombre es muy corto"
            noErrors = false
        }
        this.setState({errors})
        return noErrors
    }

    signUpWithGoogle = () => {
        signInWithGoogle()
        .then(()=>{
            this.props.history.push('/profile')
        })
        .catch(e=>{
            toastr.error(e)
        })
    }

    signUpWithFacebook = () => {
        signInWithFacebook()
        .then(()=>{
            this.props.history.push('/profile')
        })
        .catch(e=>{
            toastr.error(e)
        })
    }

    render(){
        const {errors} = this.state
        return(

    <div className="registro">
        <div className="items">
            <div className="log_img">
                <p>Let's create <br/>technology <strong>togheter.</strong> </p>
            </div>
            <div className="log_form">
                <div className="form_r">
<<<<<<< HEAD
                    <h2 className="tittle" style={{textAlign:"center"}}>Crea una cuenta con tu red social</h2>

                   <div style={{display:'flex'}}>
                    <button onClick={this.signUpWithFacebook} className="btn_signin facebook-signin">Facebook</button>
                    <button onClick={this.signUpWithGoogle} className="btn_signin google-signin">Google</button>
                    </div>

                                   
                    <div className="or">
                        <hr className="divide"/> 
                        <span style={{margin:"0 10px"}}>
                        o
                        </span>
                        <hr className="divide"/>
                    </div>
                    <h2 className="title" >Completa el formulario</h2>
                    <form className="signup-form" onSubmit={this.signUpWithEmail} action="">
                        <label htmlFor="displayName">
                        UserName
                        {errors.displayName && <span className="error-message" >{errors.displayName}</span>}
                        </label>
                        <input name="displayName" type="text" placeholder="Nickname"/>
                        
                        <label htmlFor="email">
                        Email
                        {errors.email && <span className="error-message">{errors.email}</span>}
                        </label>
                        <input name="email" type="text" placeholder="hola@firebase.mx"/>
                       
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" placeholder="Password"/>
                        <label htmlFor="password2">
                        Repite tu password
                        {errors.password && <span className="error-message">{errors.password}</span>}
                        </label>
                        <input name="password2" type="password" placeholder="Password"/>
                       
                        <button className="btn_signin">Registrar</button>
                        <p className="forget">Ya tienes una cuenta? <Link to="/login">Has clic aquí</Link></p>
=======
                    <h2 style={{textAlign:"center"}}>Crea una cuenta</h2>
                    <form action="">
                        <label htmlFor="">UserName</label>
                        <input type="text" placeholder="Nickname"/>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="hola@firebase.mx"/>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password"/>
                        <label htmlFor="">Repite tu password</label>
                        <input type="password" placeholder="Password"/>
                        <button className="btn_signin">Registrar</button>
                        <p className="forget">¿Ya tienes una cuenta? <a href="/login">Has clic aquí</a></p>
>>>>>>> f03b1c73a00ae81b194f1dceae8445402b8017a1
                    </form>
                </div>
            </div>

        </div>
    </div>
)
    }
}