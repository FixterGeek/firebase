import React from 'react';
import './Eventos.css';
import moment from 'moment'
import 'moment/locale/es'


export const CardEvent = ({start_time, name, place={}, id}) => {
    const {location={}} = place
    const {city} = location
    return (
    <div className="card_event" style={{backgroundImage:"url('https://images.pexels.com/photos/258804/pexels-photo-258804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
        <a target="_blank" href={`http://www.facebook.com/events/${id}`}>
            <div className="cubierta alineado">
                <div>
                    <p> {moment(start_time).format('h a')} | {moment(start_time).format('MMM D')}</p>
                    <p>{place.name}, {city}</p>
                    <br/>
                    <h2>{name}</h2>
                </div>
            </div>
        </a>
    </div>
    )
};