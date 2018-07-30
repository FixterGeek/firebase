import React, { Component } from 'react'
import Module from './Module'
import {DragDropContext} from 'react-beautiful-dnd'
import './styles.css'

class NewCourse extends Component{

    state = {
        modules:{
            mid1:{
                _id:'mid1',
                title: 'Primer modulo',
                duration:0,
                resourcesIds:['rid2']
            },
            mid2:{
                _id:'mid2',
                title: 'Segundo modulo',
                duration:0,
                resourcesIds:['rid3','rid4']
            }
        },
        modulesOrder:['mid1','mid2'],
        resources:{
            rid2:{
                _id:'rid2',
                title:'Primer recurso',
                video: 'link'
            },
            rid3:{
                _id:'rid3',
                title:'Segundo recurso',
                video: 'link'
            },
            rid4:{
                _id:'rid4',
                title:'Tercer recurso',
                video: 'link'
            }
        },
        resourcesOrder:['rid2']
    }

    onDragEnd = result => {
        // reorder
    }

    render(){
        return(
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <h1>Modulos</h1>
                <div className="modules-container">

                    {this.state.modulesOrder.map(moduleId=> {
                        const module = this.state.modules[moduleId]
                        const resources = module.resourcesIds.map(resourceId => this.state.resources[resourceId])
                        return <Module key={module._id} module={module} resources={resources} />
                    })}
                </div>
            </DragDropContext>

        )
    }
}

export default  NewCourse