import React from 'react';
import './Profile.css';
//import logo from '../../assets/firemx.png';
import NavProfile from '../nav/NavProfile';
import {CardProfileDisplay} from './CardProfileDisplay';
import Card from '../card/Card';

export const ProfileDisplay = () => (

    <div className="perfil">
        <NavProfile />
        <div className="fl mg">
            <CardProfileDisplay />
            <div className="profile_cursos">
                <Card/>
                <Card />

                <Card/>
                <Card />

                <Card/>


            </div>
        </div>

    </div>
);