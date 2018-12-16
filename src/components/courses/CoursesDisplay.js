import React from 'react';
import './Courses.css';
//import FontAwesome from 'react-fontawesome';
import Nav from '../nav/Nav';
import Card from '../card/Card';


export const CoursesDisplay = ({courses}) => (

    <div className="courses">
        <Nav />
        <div style={{padding:"100px 0"}}>
            <h2 className="tittle " style={{textAlign:"center"}}> Todos los cursos</h2>
            <div className="fl" style={{justifyContent:"center"}}>
                {courses.map((c,i)=><Card key={i} {...c} />)}
            </div>
        </div>
    </div>
);