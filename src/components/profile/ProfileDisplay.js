import React from 'react';
import './Profile.css';
import {Link} from 'react-router-dom';
//import logo from '../../assets/firemx.png';
import NavProfile from '../nav/NavProfile';
import {CardProfileDisplay} from './CardProfileDisplay';
import Card from '../card/Card';

export const ProfileDisplay = ({user}) => {
   const { enrolled=[]} = user
return(

    <div className="perfil">
        <NavProfile user={user} />
        <div className="fl mg">
            <CardProfileDisplay user={user} />
            <div className="profile_cursos">

                <div className="cursos_box">


            </div>
            </div>
        </div>

    </div>
)
}