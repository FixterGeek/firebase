import React, { Component } from "react";
import "./Nav.css";
import logo from "../../assets/firemx.png";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import {
	Menu,
	Dropdown
	//  Icon
} from "antd";

const pic =
	"https://secure.meetupstatic.com/photos/event/d/6/f/5/600_465595029.jpeg";

const closeSession = () => {
	localStorage.removeItem("user");
};
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
			<Menu.Item
				style={{ color: " #ccc", marginLeft: "10px" }}
				onClick={closeSession}
				key="3"
			>
				Cerrar Sesión
			</Menu.Item>
		</Link>
	</Menu>
);

class Nav extends Component {
	state = {
		user: null
	};

	componentWillMount() {
		const user = JSON.parse(localStorage.getItem("user"));
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		let displayName, photoURL;
		if (user) {
			displayName = user.displayName;
			photoURL = user.photoURL;
		}

		return (
			<div className="nav">
				<Link to="/">
					<img className="logo" src={logo} alt="logo" />
				</Link>
				<div>
					<Link to="/courses">
						<button className="btn-movil">Explorar</button>
					</Link>
					<hr />
					{!user ? (
						<Link to="/login">
							<span>Log in</span>
						</Link>
					) : (
						<div className="user_nav">
							<p>{displayName}</p>
							<div className="img_nav">
								<img src={photoURL || pic} alt={displayName} />
							</div>
							<Dropdown overlay={menu} trigger={["click"]}>
								<FontAwesome name="angle-down" />
							</Dropdown>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Nav;
