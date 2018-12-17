import React, { Component } from 'react';
import './Home.css';
import Card from '../card/Card';
import {Link} from 'react-router-dom';
import {getCoursesInfo} from '../../services/firebase'

class Courses extends Component {

    state = {
        courses:[]
    }

    componentWillMount(){
        getCoursesInfo()
        .then(courses=>{
            this.setState({courses})
        })
    }

    render() {
        const {courses} = this.state
        return (
            <div className="cursos">
                <h2 className="titulo">Últimos lanzamientos</h2>
                <div className="flex center">
                
                    {courses.map(c=><Card key={c._id} {...c} />)}
                </div>
                <Link to="/courses">
                    <p style={{textAlign:"center", color:"white", fontFamily:"Helvetica"}}>Ver todos...</p>
                </Link>
            </div>
        );
    }
}

export default Courses;
