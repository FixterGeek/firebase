import React, { Component } from 'react'
import {Module} from './Module'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import firebase from '../../services/firebase'
import {Button} from 'antd'
import './styles.css'

class NewCourse extends Component{

    state = {
        editModuleTitle:false,
        courseId:null,
        modulesOrder:['10','20'],
        modules:{
            "10":{
                _id:'10',
                title: 'Primer modulo',
                materialsIds:['1'],
                materials:{
                    '1':{
                        _id:'1',
                        title:'Primer Video',
                        video: 'link'
                    }
                }
            },
            "20":{
                _id:'20',
                title: 'Segundo modulo',
                materialsIds:['3','2'],
                materials:{
                    "2":{
                        _id:'2',
                        title:'Lectura',
                        video: 'link'
                    },
                    "3":{
                        _id:'3',
                        title:'Otro video',
                        video: 'link'
                    }
                }
            }
        },
        // materials:{
        //     "1":{
        //         _id:'1',
        //         title:'Primer Video',
        //         video: 'link'
        //     },
        //     "2":{
        //         _id:'2',
        //         title:'Lectura',
        //         video: 'link'
        //     },
        //     "3":{
        //         _id:'3',
        //         title:'Otro video',
        //         video: 'link'
        //     }
        // }
    }

    addResource = (material) => {
        const {modules} = this.state
        if(!modules[material.module].materialsIds) modules[material.module].materialsIds = []
        modules[material.module].materialsIds.push(material._id)
        if(!modules[material.module].materials) modules[material.module].materials = {}
        modules[material.module].materials[material._id] = material
        this.setState({modules})
        this.saveCourse()
    }

    onEditModuleTitle = () => {
        this.setState({
            editModuleTitle: !this.state.editModuleTitle
        })
    }

    onChangeModuleTitle = (e, id) => {
        const value = e.target.value
        const module = this.state.modules[id]
        module.title = value
        this.setState({
            ...this.state,
            modules:{...this.state.modules, [module._id]:module}
        })
        this.saveCourse()
    }

    removeModule = (id) => {
        if(!window.confirm('Seguro?')) return
        const {modules, modulesOrder} = this.state
        //TODO: remove videos in db and storage
        delete modules[id]
        modulesOrder.splice(modulesOrder.indexOf(id),1)
        //console.log(id, modules, modulesOrder)
        this.setState({modules, modulesOrder})
        
        this.saveCourse()
    }

    addModule = () => {
        const {modules, modulesOrder} = this.state
        const id = firebase.database().ref('materials').push().key
        modules[`${id}`] = {
            _id:`${id}`,
            title: 'Nuevo modulo',
            materialsIds:[]
        }
        modulesOrder.push(`${id}`)
        this.setState({modules, modulesOrder})

        this.saveCourse()
    }

    onDragEnd = result => {
        if(!result.destination) return
        if( result.destination.droppableId === result.source.droppableId && 
            result.destination.index === result.source.index) return
        if(result.type === 'module') return this.reorderModules(result)
        if(result.type === 'material') return this.reorderMateriasl(result)
    }

    reorderMateriasl = result => {
        const {destination, source, draggableId} = result
        const {modules} = this.state
    }

    reorderModules = ({destination, source, draggableId})=>{
        const {modulesOrder} = this.state
        modulesOrder.splice(source.index,1)
        modulesOrder.splice(destination.index,0,draggableId)
        this.setState({modulesOrder})
        this.saveCourse()
    }

    saveCourse = () => {
        const updates = {}
        //const course = {}
        let {courseId} = this.state
        if(!courseId){
            courseId = firebase.database().ref('cursos').push().key
            this.setState({courseId})
        }
        updates[`/cursos/${courseId}`] = {
            modules: this.state.modules,
            modulesOrder: this.state.modulesOrder
        }
        firebase.database().ref().update(updates)
        .then(r=>{
            console.log("subido")
        })
        .catch(e=>console.log(e))
    }

    componentWillMount(){
        const id = this.props.match.params.id
        if(this.props.match.params.id){
            firebase.database().ref('cursos').child(id).once('value')
            .then(snap=>{
                //console.log(snap.val())
                const modules = snap.val().modules
                const modulesOrder = snap.val().modulesOrder
                const courseId = snap.key
                this.setState({modules, modulesOrder, courseId})
            })
            .catch(e=>console.log(e))
        }
    }

    render(){
        return(
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
            <Droppable
                droppableId="all-modules"
                type="module"
                direction="vertical"
            >
            {(provided, snapshot)=>(
                <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{background:snapshot.isDraggingOver ? 'lightblue': 'inherit'}}
                >
                <h1>
                    Modulos 
                    <Button 
                    onClick={this.addModule}
                    type="primary">Agregar modulo</Button>
                </h1> 
                <div className="modules-container">

                    {this.state.modulesOrder.map((moduleId, index)=> {
                        const module = this.state.modules[moduleId]
                        const materials = module.materialsIds && module.materials ? module.materialsIds.map(materialId => module.materials[materialId]) : []
                        console.log(materials)
                        return <Module
                         addResource={this.addResource} 
                         removeModule={this.removeModule} 
                         onChange={this.onChangeModuleTitle} 
                         editModuleTitle={this.state.editModuleTitle}
                         onEdit={this.onEditModuleTitle} 
                         index={index} 
                         key={module._id} 
                         {...module} 
                         materials={materials}
                          />
                    })}
                </div>
                </div>
            )}
            
            </Droppable>
            </DragDropContext>

        )
    }
}

export default  NewCourse