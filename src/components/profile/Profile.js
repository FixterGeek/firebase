import React, { Component } from 'react';
import './Profile.css';
import {ProfileDisplay} from './ProfileDisplay';

class Profile extends Component {

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
        const {user} = this.state;
        return (
            <div className="profile">
                <ProfileDisplay user={user} />
            </div>
        );
    }
}

export default Profile;
