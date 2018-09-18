import React, { Component } from 'react';
import './Card.css';
import FontAwesome from 'react-fontawesome';
import cover from '../../assets/bootcamp.png';
import {Link} from 'react-router-dom';

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

const pic = "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29388325_1573144522780930_1082011736283807744_n.jpg?_nc_cat=0&oh=7fc6af47dc693352919cdece40f770eb&oe=5C13F04E"

class Card extends Component {
    render() {
        const {title, modulesOrder, author, modules, _id} = this.props
        const {displayName, photoURL} = author
        const [secons, lessons] = getDuration(modules)
        return (

                <div className="card"> <Link to={`/courses/${_id}`} >
                    <div className="container_img">
                        <img src={cover} alt={title}/>
                    </div>

                    <p className="clase">Course &bull; Firebase</p>

                    <h3>{title}</h3>
                    <div className="data">
                        <div style={{display:"flex"}}>
                            <img className="autor_img" src={photoURL || pic} alt={displayName}/>
                            <div>
                                <p className="autor">{displayName}</p>
                                <p className="duracion">{lessons} lecciones &bull; {Math.floor(secons / 60)} minutos</p>
                            </div>
                        </div>
                        <FontAwesome style={{color:"#363636"}} name="cog"/>

                    </div>
                </Link>
                </div>

        );
    }
}

export default Card;
