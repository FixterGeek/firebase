import React from 'react';
import './Eventos.css';
import moment from 'moment'
import 'moment/locale/es'


export const CardStream = ({start_time, name, place={}, id}) => {
    const {location={}} = place
    const {city, street} = location
    console.log(id)
    return(
        
    <div className="card_stream" style={{backgroundImage:"url('https://images.pexels.com/photos/5156/people-eiffel-tower-lights-night.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
        <a target="_blank" href={`http://www.facebook.com/events/${id}`}>
            <div className="cubierta">
                <h2>{name}</h2>

                <div className="flexini">
                    <p>{moment(start_time).format('h a')}</p>
                    <hr className="event_line"/>
                    <p>{moment(start_time).format('MMM D')} </p>
                </div>
                <p>{place.name}, {street} | {city}</p>
            </div>
        </a>
    </div>
    
);
    }