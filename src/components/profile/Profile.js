import React, { Component } from 'react';
import './Profile.css';
import {ProfileDisplay} from './ProfileDisplay';

class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <ProfileDisplay />

            </div>
        );
    }
}

export default Profile;
