import React, { Component } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

class Slide extends Component {
    render() {
        return (
            <div className="slide">
                <div className="background">
                <div className="cover">
                    <div className="intro w3-container">
                        <h1 className="w3-center w3-animate-zoom">The Firebase Learning Platform</h1>
                        <p>Change your life or your career with the right <br/>technology and right skills</p>
                        <br/>
                        <br/>
                        <Link to="/courses">
                            <button className="btn_cupon">Explorar</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn_start">¡Empieza ya!</button>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Slide;
