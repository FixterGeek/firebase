import React from 'react';
import './Profile.css';
import {Link} from 'react-router-dom';
//import logo from '../../assets/firemx.png';
import NavProfile from '../nav/NavProfile';
import {CardProfileDisplay} from './CardProfileDisplay';
import Card from '../card/Card';
import {Button} from 'antd'
import { Link } from 'react-router-dom';

<<<<<<< HEAD
export const ProfileDisplay = ({user}) => {
   const { enrolled=[]} = user
=======
export const ProfileDisplay = ({user={}}) => {
   const {photoURL, displayName, email, uid} = user
   let enrolled = []
    if(user.enrolled) enrolled = Object.keys(user.enrolled)
   //se tienen que traer los cursos de la bd
   console.log(enrolled)
>>>>>>> d42ff3b037ca657e16dab7395e8bfaed12808716
return(

    <div className="perfil">
        <NavProfile user={user} />
        <div className="fl mg">
            <CardProfileDisplay user={user} />
            <div className="profile_cursos">
<<<<<<< HEAD
=======
                {/* {enrolled.map((c,index)=>{
                    return (
                        <Card key={index} {...user.enrolled[c]} />
                    )
                })} */}
                {enrolled.length < 1 && 
                <h2 style={{color:"white"}}>
                <Link to="/courses" >
                <Button style={{background:'black', color:"white"}} >
                     Consigue tu primer curso
                </Button>
                </Link>
                
                
                </h2>}
>>>>>>> d42ff3b037ca657e16dab7395e8bfaed12808716

                <div className="cursos_box">


            </div>
            </div>
        </div>

    </div>
)
}