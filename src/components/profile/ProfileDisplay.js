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
						{enrolled.map((c,index)=>{
							return (
								<div>
									<h2>Mis cursos</h2>
									<br/>
									<Card key={index} {...c} /></div>
							)
						})}
						{enrolled.length < 1 && <div><h2 style={{color:"#ccc",  fontFamily: 'Muli'}}>Consigue tu primer curso <Link to="/courses" className="st">¡Ahora!</Link></h2></div> }


					</div>
				</div>
			</div>

		</div>
	)
}
