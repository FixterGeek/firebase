import React from 'react';
import './Courses.css';
import FontAwesome from 'react-fontawesome';
import Nav from '../nav/Nav';
import toastr from 'toastr'
import { getCourse } from '../../services/firebase';
import {Link} from 'react-router-dom'

export class ViewVideoDisplay extends React.Component{

    state = {
        courseId:null,
        moduleId:null,
        materialId:null,
        course:{},
        currentVideoLink:null
    }

    componentWillMount(){
        const courseId = this.props.match.params.courseId;
        const moduleId = this.props.match.params.moduleId;
        const materialId = this.props.match.params.materialId;
        if(!courseId || !moduleId || !materialId) this.props.history.push('/courses')
        this.setState({courseId, moduleId, materialId})
        this.getCourse(courseId, moduleId, materialId)
    }

    getCourse = (courseId, moduleId, materialId) => {
        getCourse(courseId)
        .then(course=>{
            console.log(course)
            const currentVideoLink =  course.modules[moduleId].materials[materialId].link
            console.log(currentVideoLink)
            this.setState({course, currentVideoLink})
        })
        .catch(e=>{
            console.log(e)
            toastr.error("No se pudo cargar el curso")
        })
    }

    changeVideo = (link) => {
        console.log("Qué pedo?")
        this.setState({currentVideoLink:link})
    }

    // shouldComponentUpdate(nextProps){
    //     if(this.props != nextProps) return true
    //     return false
    // }

    render(){
    const {currentVideoLink, course, courseId, moduleId} = this.state
    console.log(currentVideoLink)
    if(!course.modules) return <h1>Sin modulos</h1>
    const {modules, modulesOrder} = course
    return(
    <div className="video">
        <Nav />
        <div className="back-video">
            <div className="cover container-video">
                <div className="box-video">

                    {currentVideoLink ? 
                    <video src={currentVideoLink} className="vidios"  controls autoPlay ></video>
                    : <iframe title="video" className="vidios" src="https://www.youtube.com/embed/Rux-Q_nPrp0" frameBorder={0} allow="autoplay; encrypted-media" allowFullScreen="true"></iframe>
                    }
                </div>
                <div className="videos-fix">


                    {modulesOrder.map((id,index)=>{
                        const {materials, materialsIds} = modules[id]
                        return (
                        <div key={index} className="modulo">
                            <div className="modulo_name">
                                <FontAwesome name="check-circle" />
                                <h4>{modules[id].title}</h4>
                                <p>({materialsIds.length} lecciones)</p>
                            </div>
                            
                            {materialsIds.map(i=>{
                                return (
                                    <div onClick={()=>this.changeVideo(materials[i].link)} style={{cursor:'pointer'}} key={i} className="subtema">
                                         <div className="sub">
                                        <FontAwesome name="check" />
                                        <Link to={`/courses/${courseId}/${id}/${i}`}>
                                            <p
                                                style={{color:currentVideoLink === materials[i].link ? "orange" : null}}
                                            >{materials[i].title}</p>
                                        </Link>
                                    </div>
                            </div>
                                )
                            })}


                        </div>
                        )
                    })}





                </div>
            </div>
        </div>
    </div>
);
}
}



//<div className="modulo">
//<div className="modulo_name">
  //  <FontAwesome name="check-circle" />
  //  <h4>Firebase Install</h4>
  //  <p>(10 min)</p>
// </div>
// </div>