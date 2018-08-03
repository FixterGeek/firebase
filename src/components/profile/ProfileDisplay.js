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
<<<<<<< HEAD
            <CardProfileDisplay user={user} />
            <div className="perfil_cursos">
                <Card />
=======
            <CardProfileDisplay />
            <div className="profile_cursos">
                <Card/>
>>>>>>> f03b1c73a00ae81b194f1dceae8445402b8017a1
                <Card />

                <Card/>
                <Card />

                <Card/>


            </div>
        </div>

    </div>
)
}