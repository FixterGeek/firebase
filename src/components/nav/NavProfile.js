import React, { Component } from 'react';
import './Nav.css';
import logo from '../../assets/firemx.png';
import FontAwesome from 'react-fontawesome';
import { Menu, Dropdown, Icon } from 'antd';
import {Link} from 'react-router-dom';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="/profile">Perfil</a>
        </Menu.Item>
        <Menu.Item key="0">
            <a href="/">Todos los Cursos</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="/profile/history">Historial</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">Cerrar Sesión</Menu.Item>
    </Menu>
);

class NavProfile extends Component {
    render() {
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
                    <p>Brendi Js</p>
                    <div className="img_nav">
                        <img src="https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/12118737_861839050578151_4085607276030940820_n.jpg?_nc_cat=0&oh=c34a4f61e314568bfd1ad4e8627a6a90&oe=5BC7B8A3" alt=""/>
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
