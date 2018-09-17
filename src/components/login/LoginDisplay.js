import React from 'react';
import './Login.css';
import logo from '../../assets/firemx.png';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

export const LoginDisplay = ({emailLogin, googleLogin, facebookLogin}) => (

    <div className="log">
        <div className="items">
            <div className="log_form">
                <div className="logbox">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>

                <div className="formulario">

                <h2 className="tittle" style={{textAlign:"center", color:"#ccc"}}>Iniciar sesión </h2>
                <div style={{display:'flex'}}>
                    <button onClick={facebookLogin} className="btn_signin facebook-signin"><FontAwesome name="facebook-f"/> Facebook</button>
                    <button onClick={googleLogin} className="btn_signin google-signin"><FontAwesome name="google"/> Google</button>
                </div>


                    <br/>
                    <form onSubmit={emailLogin}>
                        <label htmlFor="">Email</label>
                        <input name="email" type="text" placeholder="E-mail"/>
                        <label htmlFor="">Password</label>
                        <input name="password" type="password" placeholder="Password"/>
                        
                        <button className="btn_signin">Log in</button>
                       
                    </form>
                    <p className="forget">¿Olvidaste tu contraseña? <a href="/">Has clic aquí</a></p>
                    <br/>
                    <div className="or">
                        <hr className="divide"/> <span style={{margin:"0 10px"}}>Or</span>
                        <hr className="divide"/>
                    </div>
                    <br/>
                    <Link to="/register">
                        <button className="btn_transparent">Crear cuenta</button>
                    </Link>
                </div>
            </div>
            <div className="log_img">
                <p>Let's create <br/>technology <strong>togheter.</strong> </p>
            </div>
        </div>
    </div>
);