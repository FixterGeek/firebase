import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
//import logo from '../../assets/firemx.png';
import NavProfile from "../nav/NavProfile";
import { CardProfileDisplay } from "./CardProfileDisplay";
import Card from "../card/Card";
import { Button } from "antd";

export const ProfileDisplay = ({ user = {} }) => {
	const { photoURL, displayName, email, uid } = user;
	let enrolled = [];
	if (user.enrolled) enrolled = Object.keys(user.enrolled);
	//se tienen que traer los cursos de la bd
	console.log(enrolled);
	return (
		<div className="perfil">
			<NavProfile user={user} />
			<div className="fl mg">
				<CardProfileDisplay user={user} />
				<div className="profile_cursos">
					{/* {enrolled.map((c,index)=>{
                    return (
                        <Card key={index} {...user.enrolled[c]} />
                    )
                })} */}
                {enrolled.length < 1 && 
                <h2 style={{color:"white"}}>
                <Link to="/courses" >
                    <Button style={{background:'transparent', color:"white", opacity:".5"}} >
                        Consigue tu primer curso
                    </Button>
                </Link>
                
                
                </h2>}

                <div className="cursos_box">

                </div>
                </div>
            </div>
    
        </div>

	);
};
