import React, { Component } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

class Slide extends Component {
    render() {
        return (
            <div className="slide">
                <div className="cover">
                    <div className="intro">
                        <h1>The Firebase Learning Platform</h1>
                        <p>Move your career or your business forward with the rigth <br/>technology and right skills</p>
                        <br/>
                        <br/>
                        <Link to="/courses">
                            <button className="btn_cupon">Explorar</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn_start">Empieza ya!</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slide;
