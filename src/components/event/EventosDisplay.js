import React from 'react';
import './Eventos.css';
import Nav from '../nav/Nav';
import {CardEvent} from './CardEvent';
import {CardStream} from './CardStream';

export const EventosDisplay = () => (

    <div className="courses">
        <Nav />
        <div className="back-event">
            <div className="cover">
                <h2 className="tittle" style={{textAlign:"center"}}> Eventos </h2>
            </div>
        </div>
        <div className="fl_event">
            <CardStream />
            <CardEvent/>
            <CardEvent/>

            <CardEvent/>
            <CardEvent/>
            <CardStream />

            <CardStream />
            <CardEvent/>
            <CardEvent/>

        </div>

    </div>
);