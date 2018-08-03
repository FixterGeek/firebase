import React, {Component} from 'react'
import firebase, {getCourses} from '../../services/firebase'
import {Link} from 'react-router-dom'
import { Button } from 'antd';

class CoursePage extends Component{

    state = {
        courses:{},
        coursesOrder:[]
    }

    componentWillMount(){
        this.getCourses()
    }

    getCourses = () => {
        getCourses()
        .then(courses=>{
            const coursesOrder = Object.keys(courses)
            this.setState({courses, coursesOrder})
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
                {coursesOrder.map(id=>{
                    const c = this.state.courses[id]
                    return <div key={id}>
                    <Link to={`/admin/courses/${id}/edit`}>
                        <h2 key={id}>{c.title}</h2>
                        </Link>
                    </div>
                })}
            </div>  
        )
    }
}

export default CoursePage