import React, { Component } from 'react';
import './Courses.css';
import {CourseDetailDisplay} from './CourseDetailDisplay';
import {getCourseInfo, enrollFreeUser} from '../../services/firebase'
import toastr from 'toastr'
import {Modal} from 'antd';

class CourseDetailContainer extends Component {

    state = {
        courseId:null,
        course:{},
        user:null,
        loading:false
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) this.setState({user})
        //
        const id = this.props.match.params.id
        if(!id) return this.props.history.push('/courses')
        this.getCourse(id)
    }

    getCourse = (id) => {
        getCourseInfo(id)
        .then(course=>{
            this.setState({course})
        })
        .catch(e=>{
            console.log(e)
            toastr.error("No se pudo cargar el curso", e)
        })
    }

    enroll = () => {
        const {user, course} = this.state
        console.log(course)
        if(!user) return this.props.history.push('/login?next=/courses/' + course._id) 
        if(user.enrolled && user.enrolled[course._id]) return this.props.history.push('/courses/' + course._id + '/view')
        if(course.isFree) return this.enrollFreeCourse()
        else this.props.history.push(`/courses/${course._id}/pay`)
    }

    enrollFreeCourse = () => {
        const {course, user} = this.state
        const confirm = Modal.confirm
        this.setState({loading:true})
        confirm({
            title: `¿Quieres inscribirte a ${course.title}`,
            content: `
            Al dar aceptar, aceptas nuestras politicas de privacidad y obtendrás acceso gratuito al curso ${course.title}
            `,
            onOk() {
            //   user.enrolled[course.id] = true
            //enroll user via cloud function
                enrollFreeUser(user, course)
                .then(user=>{
                    this.setState({user},()=>this.enroll())
                })
                .catch(e=>{
                    toastr.error("No se pudo cargar el curso", e)
                })
            },
            onCancel() {
                // confirm.destroy()
            },
          });
    }

    render() {
        const {course, loading} = this.state
        return (
            <div className="">
                <CourseDetailDisplay
                loading={loading}
                enroll={this.enroll}
                {...course} />
                {/* <EnrollModal 
                handleOk={this.enrollFreeCourse}
                handleCancel={()=>this.setState({enrollModal:false})}
                course={course}
                open={enrollModal} /> */}
            </div>
        );
    }
}

export default CourseDetailContainer;
