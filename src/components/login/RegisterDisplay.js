import React from 'react';
import './Login.css';
//import logo from '../../assets/firemx.png';

export const RegisterDisplay = () => (

    <div className="registro">
        <div className="items">
            <div className="log_img">
                <p>Let's create <br/>technology <strong>togheter.</strong> </p>
            </div>
            <div className="log_form">
                <div className="form_r">
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
                    </form>
                </div>
            </div>

        </div>
    </div>
);