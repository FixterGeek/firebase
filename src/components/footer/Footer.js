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
                        <Link to="/history">
                            <p>Sobre nosotros</p>
                        </Link>
                        <Link to="/events">
                            <p>Eventos</p>
                        </Link>
                        <Link to="/contact">
                            <p>Contacto</p>
                        </Link>
                    </div>
                    <div className="redes">
                        <a href="https://www.facebook.com/firebasemexico/" target="blank">
                            <FontAwesome name="facebook-square"/>
                        </a>
                        <a href="https://twitter.com/FirebaseMexico_" target="blank">
                            <FontAwesome name="twitter-square"/>
                        </a>
                        <a href="https://www.linkedin.com/company/firebase-mexico/" target="blank">
                            <FontAwesome name="github-square"/>
                        </a>
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