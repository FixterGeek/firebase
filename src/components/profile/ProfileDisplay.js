import React from 'react';
import './Profile.css';
//import logo from '../../assets/firemx.png';
import NavProfile from '../nav/NavProfile';
import {CardProfileDisplay} from './CardProfileDisplay';
import Card from '../card/Card';

export const ProfileDisplay = ({user}) => {
   // const {photoURL, displayName, email, uid} = user
return(

    <div className="perfil">
        <NavProfile user={user} />
        <div className="fl mg">
            <CardProfileDisplay user={user} />
            <div className="perfil_cursos">
                <Card />
                <Card />
                <Card />

            </div>
        </div>

    </div>
)
}