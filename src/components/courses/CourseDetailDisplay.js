import React from 'react';
import './Courses.css';
import FontAwesome from 'react-fontawesome';
import Nav from '../nav/Nav';
import {CardVideo} from './CardVideoDisplay';

const desc = "JavaScript is the most widely deployed language in the world. Whether you’re interested in writing front-end client side code, back-end code for servers, or even game development..."

function getDuration(modules){
    let lessons = 0
    let secons = 0 //seconds
    for(let k in modules){
        for(let i in modules[k].materials){
            lessons++
            if(modules[k].materials[i].duration) {
                secons += modules[k].materials[i].duration
            }
        }
    }
    
    return [secons, lessons]

}

export const CourseDetailDisplay = ({title, _id, author={}, modules, modulesOrder, description}) => {
const [secons, lessons] = getDuration(modules)
//console.log(modulesOrder, modules)
if(!modulesOrder || !modules) return null
return (

    <div className="courses">
        <Nav />
        <div className="back-detail">
            <div className="cover">
                <div className="fl_curso">
                    <div className="cursi">
                    <div className="logo_curso">
                        <img src="http://www.stickpng.com/assets/images/5847f40ecef1014c0b5e488a.png" alt=""/>
                    </div>
                    <div className="data_curso">
                        <h2 className="tittle">{title}</h2>
                        <p>{author.displayName}</p>
                        <p>{lessons} lecciones &bull; {Math.floor(secons/60)} minutos</p>
                        <p>{description || desc}</p>
                        <button className="btn_iniciar">
                            Empezar
                        </button>
                    </div></div>
                </div>
            </div>

        </div>
        <div className="clasificacion">            

            {modulesOrder.map((id,index)=>{
                return (
                    <article key={index} >
                    <div className="referencia">
                        <h2 className="titulin">{modules[id].title}</h2>   <FontAwesome name="angle-down"/>
                    </div>
                    
                    <div className="fl_vidios">
                        {modules[id].materialsIds.map((i, ind)=>{
                            return (
                               <CardVideo key={i} moduleId={id} courseId={_id} index={ind} {...modules[id].materials[i]} />
                            )
                        })}
                    </div>

                    <hr className="linea"/>
                    </article>
                )
            })}




        </div>
    </div>
)
};




// <div  className="referencia">
// <h2 className="titulin">Contenido</h2>  <FontAwesome name="angle-down"/></div>
// <hr className="linea"/>
// <div  className="referencia">
// <h2 className="titulin">Proyectos</h2>  <FontAwesome name="angle-down"/></div>
// <hr className="linea"/>