import React, { Component } from 'react';
import './Home.css';
import Card from '../card/Card';

class Courses extends Component {
    render() {
        return (
            <div className="cursos">
                <h2 className="titulo">Cursos</h2>
                <div className="flex center">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        );
    }
}

export default Courses;
