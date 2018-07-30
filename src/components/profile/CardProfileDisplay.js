import React from 'react';
import './Profile.css';
import FontAwesome from 'react-fontawesome';

export const CardProfileDisplay = () => (

    <div className="card_profile">
        <div className="photo_user">
            <img src="https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/12118737_861839050578151_4085607276030940820_n.jpg?_nc_cat=0&oh=c34a4f61e314568bfd1ad4e8627a6a90&oe=5BC7B8A3" alt=""/>
        </div>
        <p className="user_name">Brendi JS</p>
        <p className="user_job"><FontAwesome name="briefcase"/> CEO FIXTER</p>
        <p className="user_descript">Pollo pollollon pollencio</p>

    </div>
);