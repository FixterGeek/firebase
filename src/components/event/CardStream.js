import React from 'react';
import './Eventos.css';


export const CardStream = () => (
    <div className="card_stream" style={{backgroundImage:"url('https://images.pexels.com/photos/5156/people-eiffel-tower-lights-night.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
        <a href="">
            <div className="cubierta">
                <h2>Meetup Mensual #26</h2>

                <div className="flexini">
                    <p>7:00 pm</p>
                    <hr className="event_line"/>
                    <p>Agosto 24 </p>
                </div>
                <p>Zamora 187, Condesa</p>
            </div>
        </a>
    </div>
);