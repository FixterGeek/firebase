import React, { Component } from 'react';
import './Nav.css';
import logo from '../../assets/firemx.png';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
                <div>
                    <Link to="/courses">
                        <button>Get started</button>
                    </Link>
                    <hr/>
                    <Link to="/login">
                        <span>Log in</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Nav;
