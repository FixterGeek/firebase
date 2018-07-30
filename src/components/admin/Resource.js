import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

class Resource extends React.Component{
    render()
    {
        return (
            <Draggable
                draggableId={this.props._id}
                index={this.props.index}>
                {provided=>(
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className="resource-item" >
                        <p>{this.props.title}</p>
                    </div>
                )}

            </Draggable>
        )
    }
}

export default Resource