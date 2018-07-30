import React, {Component} from 'react'
import Resource from './Resource'
import {Droppable} from 'react-beautiful-dnd'

class Module extends Component{
    render(){
        return(
            <div className="module-item">
                <h3>{this.props.module.title}</h3>
                <Droppable
                    droppableId={this.props.module._id}>
                    {provided=>(
                        <div
                            innerRef={provided.innerRef}
                            {...provided.droppableProps} >
                            {this.props.resources.map((r,index)=>{
                                return <Resource index={index} key={r._id} {...r} />
                            })}
                            {provided.placeholder}
                        </div>

                        )}

                </Droppable>
            </div>
        )
    }
}


export default Module
   