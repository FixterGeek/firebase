import React, {Component} from 'react'
import {getCourse} from '../../services/firebase'

class CourseDetail extends Component{

    state = {
        course:null
    }

    componentWillMount(){
        const key = this.props.match.params.id
        getCourse(key)
        .then(course=>{
            this.setState({course})
        })
    }

    render(){
        const {course} = this.state
        if(!course) return <h1>Cargando...</h1>
        return(
            <div>
                <h2>{course.title}</h2>
                {course.modules.map(m=><p key={m._id} >{m.title}</p>)}
            </div>
        )
    }
}

export default CourseDetail