import React, { Component } from 'react';
import './Eventos.css';
import {EventosDisplay} from './EventosDisplay';

class Eventos extends Component {

    componentDidMount () {
        window.scroll(0, 0)


    }
    render() {
        return (
            <div className="">
                <EventosDisplay />
            </div>
        );
    }
}

export default Eventos;
