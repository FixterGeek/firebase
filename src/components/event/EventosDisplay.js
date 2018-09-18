import React from 'react';
import './Eventos.css';
import Nav from '../nav/Nav';
import {CardEvent} from './CardEvent';
import {CardStream} from './CardStream';
import moment from 'moment'
import 'moment/locale/es'

export const EventosDisplay = ({events=[]}) => (

    <div className="courses">
        <Nav />
        <div className="back-event">
            <div className="cover">
                <h2 className="tittle" style={{textAlign:"center"}}> Eventos </h2>
            </div>
        </div>
        <div className="fl_event">

            {events.map((e,i)=>{
                if(moment().diff(e.start_time, 'minutes') < 0){
                    return <CardStream  key={i} {...e} />
                }else{
                    return <CardEvent key={i} {...e} />
                }
                   
            })}
             {/* <CardStream /> */}
           
            {/* <CardEvent/>
            <CardEvent/>

            <CardEvent/>
            <CardEvent/>
           

            <CardStream />
            <CardEvent/>
            <CardEvent/> */}

        </div>

    </div>
);