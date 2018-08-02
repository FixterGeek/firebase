import React, { Component } from 'react';
import './Courses.css';
import {CoursesDisplay} from './CoursesDisplay';

class Courses extends Component {
    componentDidMount () {
        window.scroll(0, 0)
    }

    render() {
        return (
            <div className="">
                <CoursesDisplay />
            </div>
        );
    }
}

export default Courses;
