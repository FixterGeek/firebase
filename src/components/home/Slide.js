import React, { Component } from 'react';
import './Home.css';

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
                        <button className="btn_cupon">Explorar</button>

                        <button className="btn_start">Empieza ya!</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slide;
