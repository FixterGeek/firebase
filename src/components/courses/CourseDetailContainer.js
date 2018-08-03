import React, { Component } from 'react';
import './Courses.css';
import {CourseDetailDisplay} from './CourseDetailDisplay';

class CourseDetailContainer extends Component {

    componentDidMount () {
        window.scroll(0, 0)
    }
    render() {
        return (
            <div className="">
                <CourseDetailDisplay />
            </div>
        );
    }
}

export default CourseDetailContainer;
