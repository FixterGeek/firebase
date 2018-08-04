import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import FontAwesome from 'react-fontawesome'


class Resource extends React.Component{

    render(){
        const {_id, title, index, removeResource} = this.props
        return (
            <Draggable
                draggableId={_id}
                index={index}>
                {provided=>(
                    <div
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                        className="resource-item" >
                        <FontAwesome
                            className='super-crazy-colors'
                            name='minus-square'
                            size='2x'
                            style={{ cursor:"drag", color:'orange', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            {...provided.dragHandleProps}
                        />
                        <p style={{marginLeft:5}} >{title}</p>
                        <FontAwesome
                            onClick={()=>{
                                if(!window.confirm("Seguro de eliminar?")) return
                                removeResource(_id)
                            }}
                            className='super-crazy-colors'
                            name='trash'
                            size='2x'
                            style={{ cursor:"pointer", color:'red', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                    </div>
                )}

            </Draggable>
        )
    }
}

export default Resource