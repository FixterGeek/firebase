import React from 'react'
//import Resource from './Resource'
import {Draggable} from 'react-beautiful-dnd'
import { Card, Input, Button, Modal } from 'antd';
import FontAwesome from 'react-fontawesome'
import ResourceForm from './ResourceForm'


export const Module = ({addResource,removeModule,onChange, editModuleTitle, index, _id, title, materials, onEdit}) => {
    console.log(materials)    
    return(
            <div>
            <Draggable
                draggableId={_id}
                index={index}
            >
            {(provided, snapshot)=>(
                <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <Card 
                        type={snapshot.isDragging ? 'inner':null}
                        title={ index + 1 + '. ' + title} 
                        extra={editModuleTitle ? 
                            <div>
                        <Input onPressEnter={onEdit} onChange={(e)=>onChange(e,_id)} value={title} placeholder="Titulo del modulo" /> 
                        <a onClick={onEdit} href="#!">Terminar</a>
                        </div>
                        : 
                        <div>
                        <a onClick={onEdit} href="#!">Editar</a>
                        <FontAwesome
                            onClick={()=>removeModule(_id)}
                            className='super-crazy-colors'
                            name='trash'
                            size='2x'
                            style={{ cursor:"pointer", color:'red', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        </div>
                        } 
                        style={{ width: 300 }}>
                        {materials.map((m, index)=><p key={index} >{m.title}</p>)}
                        <ResourceForm addResource={addResource} module={{_id, title}} />
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