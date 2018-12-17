import React, {Component} from 'react'
import firebase, {getCourses} from '../../services/firebase'
import {Link} from 'react-router-dom'
import { Button } from 'antd';
import toastr from 'toastr';
import './styles.css';
import CardAdmin from "../card/CardAdmin";

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
            <div className="admin-courses">
                <div className="wlc">
                    <h2 style={{color:"white", opacity:".5", marginBottom:"0"}}>Bienvenido al panel de FirebaseMx</h2>
                </div>
                <div className="content">
                    <div className="add">
                        <h2>Cursos</h2>
                        <Link to="/admin/courses/new/">
                            <button className="btn-add">
                                Agregar Curso
                            </button>
                        </Link>
                    </div>
                    <div className="flx">
                        {courses.map(c=>{
                            //const c = this.state.courses[id]
                            return <div key={c._id}>
                            <Link to={`/admin/courses/${c._id}/edit`}>
                              
                                <CardAdmin key={c._id} {...c} />
                            </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>  
        )
    }
}

export default CoursePage