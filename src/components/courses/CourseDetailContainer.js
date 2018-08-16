import React, { Component } from 'react';
import './Courses.css';
import {CourseDetailDisplay} from './CourseDetailDisplay';
import {getCourseInfo} from '../../services/firebase'
import toastr from 'toastr'

class CourseDetailContainer extends Component {

    state = {
        courseId:null,
        course:{}
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    componentWillMount(){
        const id = this.props.match.params.id
        if(!id) return this.props.history.push('/courses')
        this.getCourse(id)
    }

    getCourse = (id) => {
        getCourseInfo(id)
        .then(course=>{
            //console.log(course)
            this.setState({course})
        })
        .catch(e=>{
            console.log(e)
            toastr.error("No se pudo cargar el curso", e)
        })
    }

    render() {
        const {course} = this.state
        return (
            <div className="">
                <CourseDetailDisplay {...course} />
            </div>
        );
    }
}

export default CourseDetailContainer;
