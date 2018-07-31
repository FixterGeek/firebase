import React, { Component } from 'react';
import './Footer.css';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="flex space">
                    <div className="footer_about">
                        <h3>FirebaseMex</h3>
                        <hr/>
                        <br/>
                        <p>Sobre nosotros</p>
                        <Link to="/events">
                            <p>Eventos</p>
                        </Link>
                        <Link to="/contact">
                            <p>Contacto</p>
                        </Link>
                    </div>
                    <div className="redes">
                        <FontAwesome name="facebook-square"/>
                        <FontAwesome name="twitter-square"/>
                        <FontAwesome name="github-square"/>
                        <FontAwesome name="linkedin"/>
                        <FontAwesome name="youtube"/>
                    </div>
                </div>
                <div className="copy" >
                    <p>Copyright © 2016 - 2018 FirebaseMx All rights reserved
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;