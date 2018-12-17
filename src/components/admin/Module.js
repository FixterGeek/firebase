import React from 'react'
import Resource from './Resource'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import { Card, Input, 
    //Button, 
    //Modal 
} from 'antd';
import FontAwesome from 'react-fontawesome'
import ResourceForm from './ResourceForm'


export const Module = ({courseId,removeResource, addResource,removeModule,onChange, editModuleTitle, index, _id, title, materials, onEdit}) => {
    
    return(
            <div>
            <Draggable
                draggableId={_id}
                index={index}
            >
            {(provided, snapshot)=>(
                <div
                {...provided.draggableProps}
                ref={provided.innerRef}
                >
                    <Card 
                        type={snapshot.isDragging ? 'inner':null}
                        title={index + 1 + '. ' + title}
                        extra={editModuleTitle ? 
                        <div>
                        <Input onPressEnter={onEdit} onChange={(e)=>onChange(e,_id)} value={title} placeholder="Titulo del modulo" /> 
                        <a onClick={onEdit} href="#!">Terminar</a>
                        </div>
                        : 
                        <div>
                        <a onClick={onEdit} style={{color:"#ccc"}} >
                        <span >  Editar</span>
                        </a>
                        <FontAwesome
                            onClick={()=>removeModule(_id)}
                            className='super-crazy-colors'
                            name='trash'
                            size='2x'
                            style={{ cursor:"pointer", color:'#cccccc', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        <FontAwesome
                            className='super-crazy-colors'
                            name='minus-square'
                            size='2x'
                            style={{ cursor:"drag", color:'#ffa711', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            {...provided.dragHandleProps}
                        />
                        </div>} 
                        style={{ width: 300 }} >

                        <Droppable
                        droppableId={_id}
                        index={index}
                        type="material"
                        
                        >
                        {(provided, snapshot)=>(
                            <section 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="droppableArea"
                            style={{minHeight:50}}
                            >
                        
                            {materials.map((m, index)=><Resource removeResource={(resourceId)=>removeResource(resourceId, _id)} index={index} key={m._id} {...m} />)}
                            
                            {provided.placeholder}
                            </section>
                        )}
                        </Droppable>

                        <ResourceForm courseId={courseId} addResource={addResource} module={{_id, title}} />
                    </Card>
                </div> 
            )}
           </Draggable>
           </div> 
        )
    
}


export default Module
   

// <form onSubmit={addVideo} nativeValidated>  
// <Input required placeholder="Nuevo Recurso" />
// <input required type="file"/>
// <input type="submit" />
// </form>