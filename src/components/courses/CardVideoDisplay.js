import React from 'react';
import './Courses.css';
//import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom'

export const CardVideo = ({duration, title, index, courseId, _id, moduleId}) => {
    let metric = "min"
    duration = Number(duration)
    const min = Math.floor(duration / 60)
    if(min < 1) {
        metric = "sec"
        duration = duration.toPrecision(4)
    }else{
        duration = min
    }
return (

    <div className="card_video">
        <Link to={`/courses/${courseId}/${moduleId}/${_id}`}>
            <div className="ccc">
                <div style={{height:"80%"}}>
                    <span>{index + 1}</span>
                </div>
                <div className="date_video">
                    <h4>{title}</h4>
                    <p>{duration}{metric}</p>
                </div>
            </div>
        </Link>
    </div>
)
};