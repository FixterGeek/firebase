import React from 'react';
import './Login.css';
import logo from '../../assets/firemx.png';
import {Link} from 'react-router-dom';

export const LoginDisplay = () => (

    <div className="log">
        <div className="items">
            <div className="log_form">
                <div className="logbox">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <div className="formulario">
                    <form action="">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="E-mail"/>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password"/>
                        <Link to="/profile" >
                            <button className="btn_signin">Log in</button>
                        </Link>
                    </form>
                    <p className="forget">Olvidaste tu contrasena? <a href="/">Has clic aquí</a></p>
                    <br/>
                    <div className="or">
                        <hr className="divide"/> <span style={{margin:"0 10px"}}>Or</span>
                        <hr className="divide"/>
                    </div>
                    <br/>
                    <a href="/register">
                        <button className="btn_transparent">Crear cuenta</button>
                    </a>
                </div>
            </div>
            <div className="log_img">
                <p>Let's create <br/>technology <strong>togheter.</strong> </p>
            </div>
        </div>
    </div>
);