import React, { Component } from 'react';
import './History.css';
import Nav from '../nav/Nav';

class HistoryContainer extends Component {
    render() {
        return (
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
                    Firebase con cualquier tecnologia (ReactJs, AngularJs, IOS, Android, y más).



                </p>
            </div>
        );
    }
}

export default HistoryContainer;
