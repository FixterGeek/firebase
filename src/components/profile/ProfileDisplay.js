import React from 'react';
import './Profile.css';
//import logo from '../../assets/firemx.png';
import NavProfile from '../nav/NavProfile';
import {CardProfileDisplay} from './CardProfileDisplay';
import Card from '../card/Card';

export const ProfileDisplay = ({user}) => {
   const {photoURL, displayName, email, uid, enrolled=[]} = user
return(

    <div className="perfil">
        <NavProfile user={user} />
        <div className="fl mg">
            <CardProfileDisplay user={user} />
            <div className="profile_cursos">
                {enrolled.map((c,index)=>{
                    return (
                        <Card key={index} {...c} />
                    )
                })}
                {enrolled.length < 1 && <h2 style={{color:"white"}}>Consigue tu primer curso</h2>}


            </div>
        </div>

    </div>
)
}