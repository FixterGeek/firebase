import React from 'react';
import './Courses.css';
import FontAwesome from 'react-fontawesome';
import Nav from '../nav/Nav';
import Card from '../card/Card';


export const CourseDetailDisplay = ({}) => (

    <div className="courses">
        <Nav />
        <div className="back-detail">
            <div className="cover">
                <div className="fl_curso">
                    <div className="logo_curso">
                        <img src="http://www.stickpng.com/assets/images/5847f40ecef1014c0b5e488a.png" alt=""/>
                    </div>
                    <div className="data_curso">
                        <p>Curso</p>
                        <h3 className="tittle">Firebase Tools</h3>
                        <p>By Brendi Js</p>
                        <p>25 lecciones &bull; 55 minutos</p>
                        <p>JavaScript is the most widely deployed language in the world.
                            Whether you’re interested in writing front-end client side code,
                            back-end code for servers, or even game development...</p>
                        <button className="btn_iniciar">
                            Empezar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
);