import React, {Component} from 'react'
import firebase, {getCourses} from '../../services/firebase'
import {Link} from 'react-router-dom'
import { Button } from 'antd';
import toastr from 'toastr'

class CoursePage extends Component{

    state = {
        courses:[],
        //coursesOrder:[]
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user.isAdmin) return this.props.history.push('/profile')
        this.getCourses()
    }

    getCourses = () => {
        getCourses()
        .then(courses=>{
            //const coursesOrder = Object.keys(courses
            this.setState({courses})
        })
            .catch(e=>{
                console.log(e)
              toastr.error(e)
            })
    }

    render(){
        const {courses, coursesOrder} = this.state
        return(
            <div>
                <h1>Cursos</h1>
                <Link to="/admin/courses/new/">
                    <Button>
                        Agregar Curso
                    </Button>
                </Link>
                {courses.map(c=>{
                    //const c = this.state.courses[id]
                    return <div key={c._id}>
                    <Link to={`/admin/courses/${c._id}/edit`}>
                        <h2 key={c._id}>{c.title}</h2>
                        </Link>
                    </div>
                })}
            </div>  
        )
    }
}

export default CoursePage