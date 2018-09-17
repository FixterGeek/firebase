import React from 'react';
import './Profile.css';
import FontAwesome from 'react-fontawesome';
const pic = "https://secure.meetupstatic.com/photos/event/d/6/f/5/600_465595029.jpeg"

export const CardProfileDisplay = ({user}) => (

    <div className="card_profile">
        <div className="photo_user">
            <img src={user.photoURL || pic} alt={user.displayName}/>
        </div>
        <br/>
        <p className="user_name">{user.displayName}</p>
        <p className="user_job"><FontAwesome name="briefcase"/> USUARIO PREMIUM</p>
        <p className="user_descript">Pollo pollollon pollencio</p>

    </div>
);