import React from 'react';
import './Courses.css';
import FontAwesome from 'react-fontawesome';
import Nav from '../nav/Nav';

export const ViewVideoDisplay = () => (

    <div className="video">
        <Nav />
        <div className="back-video">
            <div className="cover container-video">
                <div className="box-video">

                    <iframe title="video" className="vidios" src="https://www.youtube.com/embed/Rux-Q_nPrp0" frameBorder={0} allow="autoplay; encrypted-media" allowFullScreen="true"></iframe>
                </div>
                <div className="videos-fix">
                    <div className="modulo">
                        <div className="modulo_name">
                            <FontAwesome name="check-circle" />
                            <h4>Firebase Install</h4>
                            <p>(10 min)</p>
                        </div>
                        <div className="">

                        </div>
                    </div>
                    <div className="modulo">
                        <div className="modulo_name">
                            <FontAwesome name="check-circle" />
                            <h4>Firebase Install</h4>
                            <p>(10 min)</p>
                        </div>
                        <div className="subtema">
                            <div className="sub">
                                <FontAwesome name="check-circle" />
                                <p>Npm install now!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);