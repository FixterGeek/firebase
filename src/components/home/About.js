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

                        <p className="parrafo">Es la plataforma en donde encontrarás todas las herramientas que
                        te ofrece Firebase: El backend as a service de Google, y su implementación
                        con distintas tecnologías.
                        </p>
                        <p className="parrafo">
                        Mantente al día a pesar de la velocidad con la que cambia la tecnología
                            al estudiar de forma más rápida e inteligente, y adquiere las habilidades
                            de mas de mando en el ecosistema tecnologico.
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
