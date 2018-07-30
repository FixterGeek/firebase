import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

class Resource extends React.Component{
    render(){
        const {_id, title, index} = this.props
        return (
            <Draggable
                draggableId={_id}
                index={index}>
                {provided=>(
                    <div
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                        className="resource-item" >
                        <div
                            style={{width:50,height:50,background:'red'}}
                            {...provided.dragHandleProps}
                        ></div> 
                        <p>{title}</p>
                    </div>
                )}

            </Draggable>
        )
    }
}

export default Resource