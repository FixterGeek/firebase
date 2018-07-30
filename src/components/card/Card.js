import React, { Component } from 'react';
import './Card.css';
import FontAwesome from 'react-fontawesome';
import author from '../../assets/bootcamp.png';
import {Link} from 'react-router-dom';

class Card extends Component {
    render() {
        return (

                <div className="card"> <Link to="/courses/id" >
                    <div className="container_img">
                        <img src={author} alt=""/>
                    </div>

                    <p className="clase">Course &bull; Firebase</p>

                    <h3>Firebase Tools</h3>
                    <div className="data">
                        <div style={{display:"flex"}}>
                            <img className="autor_img" src="https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29388325_1573144522780930_1082011736283807744_n.jpg?_nc_cat=0&oh=7fc6af47dc693352919cdece40f770eb&oe=5C13F04E" alt=""/>
                            <div>
                                <p className="autor">Brendi Js</p>
                                <p className="duracion">25 lecciones &bull; 55 minutos</p>
                            </div>
                        </div>
                        <FontAwesome name="cog"/>

                    </div>
                </Link>
                </div>

        );
    }
}

export default Card;
