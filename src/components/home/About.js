import React, { Component } from 'react';
import './Home.css';
import phone from '../../assets/phone.png';

class About extends Component {
    render() {
        return (
            <div className="about">
                <div className="flex">
                    <div className="about_text">
                        <h2 className="titulo">What it is?</h2>
                        <hr className="line_white"/>
                        <p >
                            La tecnología se mueve tan rápido, que en ocasiones,
                            a pesar de la pasión u curiosidad que sientes por ella,
                            es difícil aprender y actualizarse debido a la gran
                            cantidad de información que encontramos en la web o en
                            libros, y a lo dispersa que esta información se
                            encuentra.
                        </p>
                        <p >
                            Es por eso que en FirebaseMx decidimos desarrollar
                            “FirebaseMx Learning Platform”, una plataforma única
                            en donde encontraras cursos, ejercicios y artículos
                            sobre Firebase: el backend as a service de google.
                            Tal vez te preguntes ¿Qué es Firebase? Es un backend
                            que permite la creación de apps de forma ágil,
                            minimizando el tiempo de desarrollo mediante
                            funciones específicas, detección de errores y
                            testing, ademas de permitirte la monetización
                            de tus aplicaciones mediante AdMob.
                        </p>
                    </div>
                    <div className="about_img">
                        <img src={phone} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
