import React, { Component } from 'react';
import './Nav.css';
import logo from '../../assets/firemx.png';
import FontAwesome from 'react-fontawesome';
import { Menu, Dropdown,
   //  Icon
     } from 'antd';
import {Link} from 'react-router-dom';

const pic = "https://secure.meetupstatic.com/photos/event/d/6/f/5/600_465595029.jpeg"


const closeSession = () => {
    localStorage.removeItem('user')
}

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/profile">Perfil</Link>
        </Menu.Item>
        <Menu.Item key="0">
            <Link to="/courses">Todos los Cursos</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/profile/history">Historial</Link>
        </Menu.Item>
        <Menu.Divider />
        <Link to="/login">
        <Menu.Item style={{color:" #ccc", marginLeft:"10px"}} onClick={closeSession} key="3">Cerrar Sesión</Menu.Item>
        </Link>
    </Menu>
);

class NavProfile extends Component {
    render() {
        const {user} = this.props;
        const {photoURL, displayName} = user;
        return (
            <div className="nav-perfil">
                <div className="flexin">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div>
                        <input type="text" placeholder="Buscar..."/>
                        <FontAwesome name="search"/>
                    </div>
                </div>
                <div className="user_nav">
                    <p>{displayName}</p>
                    <div className="img_nav">
                        <img src={photoURL || pic} alt={displayName}/>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <FontAwesome name="angle-down"/>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default NavProfile;
