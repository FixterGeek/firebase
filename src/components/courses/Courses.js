import React, { Component } from 'react';
import './Courses.css';
import {CoursesDisplay} from './CoursesDisplay';
import {getCoursesInfo} from '../../services/firebase'
import toastr from 'toastr'

class Courses extends Component {

    state = {
        courses:[]
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    componentWillMount(){
        this.getCourses()
    }

    getCourses = () => {
        getCoursesInfo()
        .then(courses=>{
            this.setState({courses})
            //console.log(courses)
        })
        .catch(e=>{
            console.log(e)
            toastr.error('No se pudieron cargar los cursos')
        })
    }

    render() {
        const {courses} = this.state
        return (
            <div className="">
                <CoursesDisplay courses={courses} />
            </div>
        );
    }
}

export default Courses;
