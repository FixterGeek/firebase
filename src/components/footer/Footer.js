import React, { Component } from 'react';
import './Footer.css';
import FontAwesome from 'react-fontawesome';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="flex space">
                    <div className="footer_about">
                        <h3>FirebaseMex</h3>
                        <hr/>
                        <p>Sobre nosotros</p>
                        <p>Eventos</p>
                        <p>Contacto</p>
                    </div>
                    <div className="redes">
                        <FontAwesome name="facebook-square"/>
                        <FontAwesome name="twitter-square"/>
                        <FontAwesome name="github-square"/>
                        <FontAwesome name="linkedin"/>
                        <FontAwesome name="youtube"/>
                    </div>
                </div>
                <div style={{textAlign:"center"}}>
                    <p>Copyright © 2016 - 2018 FirebaseMx All rights reserved
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;