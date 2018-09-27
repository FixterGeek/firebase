import React, { Component } from 'react';
import './History.css';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

class HistoryContainer extends Component {
    componentDidMount () {
        window.scroll(0, 0)
    }
    render() {
        return (
            <div>
            <div className="history" >
                <Nav />
                <br/>

                <div className="text_history" >
                    <div className="cover_history">
                    </div>
                </div>
                <h2>Firebase Mx</h2>
                <p>Firebase Mx es la comunidad más grande de Firebase en México,
                    fundada en Abril de 2016, con expertos en la implementación de
                    Firebase con cualquier tecnología (ReactJs, AngularJs, IOS, Android, y más).
                </p>
                <p>
                    Tenemos un Meetup mensual el último martes de cada mes, donde
                    compartimos proyectos, actualizaciones y conocimientos sobre esta tecnología,
                    y a los cuales puedes asistir de forma gratuita.
                </p>
                <br/>
                <br/>

            </div></div>
        );
    }
}

export default HistoryContainer;
