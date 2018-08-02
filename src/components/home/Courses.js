import React, { Component } from 'react';
import './Home.css';
import Card from '../card/Card';
import {Link} from 'react-router-dom';

class Courses extends Component {
    render() {
        return (
            <div className="cursos">
                <h2 className="titulo">Últimos lanzamientos</h2>
                <div className="flex center">
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Link to="/courses">
                    <p style={{textAlign:"center", color:"#ffa711", fontFamily:"Helvetica"}}>Ver todos...</p>
                </Link>
            </div>
        );
    }
}

export default Courses;
