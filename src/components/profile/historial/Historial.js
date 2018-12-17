import React, { Component } from 'react';
import './Historial.css';
import {HistorialDisplay} from './HistorialDisplay';
import NavProfile from "../../nav/NavProfile";

class Historial extends Component {
    state = {
        user:{}
    }

    componentWillMount(){
        this.getUser()
    }

    getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
    }
    render() {
        const {user} = this.state
        return (
            <div className="">
            	<NavProfile user={user} />
                <HistorialDisplay />

            </div>
        );
    }
}

export default Historial;
