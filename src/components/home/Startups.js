import React, { Component } from 'react';
import './Home.css';

class Startups extends Component {
    render() {
        return (
            <div className="startups">
                <h2 className="titulo bot" style={{color:"#a1a1a1"}}>Firebase Users</h2>

                <div className="flex center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Shazam_logo.svg/1280px-Shazam_logo.svg.png" alt="shazam"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo.svg/2000px-Duolingo_logo.svg.png" alt="duolingo"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png" alt="NewYorkTimes"/>
                    <img src="https://www.tudecide.com/assets/images/empresas/klic_cinepolis.png" alt="CinepolisClick"/>

                </div>
            </div>
        );
    }
}

export default Startups;
