import React, { Component } from 'react'
import {Module} from './Module'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import firebase, {saveCourse, getCourse} from '../../services/firebase'
import {Button, Input} from 'antd'
import FontAwesome from 'react-fontawesome'
import toastr from 'toastr'
import './styles.css'


class NewCourse extends Component{

    state = {
        course:{
            title:"Nuevo Curso"
        },
        editModuleTitle:false
    }

    removeResource = (materialId, moduleId) => {
        const {course} = this.state
        const {modules} = course
        const index = modules[moduleId].materialsIds.indexOf(materialId)
        //lo sacamos de la lista
        modules[moduleId].materialsIds.splice(index,1)
        //lo eliminamos del objeto
        delete modules[moduleId].materials[materialId]
        course.modules = modules
        this.saveCourse(course)
        const fileRef = firebase.storage().ref('videos').child(course._id).child(materialId);
        fileRef.delete()
    }

    addResource = (material) => {
        const {course} = this.state
        const moduleId = material.module
        const module = course.modules[moduleId]
        const {materialsIds=[], materials={}} = module
        materialsIds.push(material._id)
        materials[material._id] = material
        module.materials = materials
        module.materialsIds = materialsIds
        course.modules[moduleId] = module
        this.saveCourse(course)
    }

    onEditModuleTitle = () => {
        this.setState({
            editModuleTitle: !this.state.editModuleTitle
        })
        saveCourse(this.state.course)
    }

    onChangeModuleTitle = (e, id) => {
        const value = e.target.value
        const {course} = this.state
        const module = course.modules[id]
        module.title = value
        course.modules[id] = module
        this.setState({course})
    }

    removeModule = (id) => {
        if(!window.confirm('Seguro?')) return
        const {course} = this.state
        const {modules, modulesOrder} = course
        //TODO: remove videos in db and storage
        const module = modules[id]
        if(module.materialsIds){
            for(let key of module.materialsIds){
                const fileRef = firebase.storage().ref('videos').child(course._id).child(key);
                fileRef.delete()
            }
        }
        //remove module
        delete modules[id]
        modulesOrder.splice(modulesOrder.indexOf(id),1)
        course.modules = modules
        course.modulesOrder = modulesOrder        
        this.saveCourse(course)
    }

    addModule = () => {
        const {course} = this.state
        const {modules={}, modulesOrder=[]} = course
        const key = firebase.database().ref('materials').push().key
        const module = {
            _id: key,
            title: 'Nuevo modulo'
        }
        modules[key] = module
        modulesOrder.push(key)
        course.modules = modules
        course.modulesOrder = modulesOrder
        this.saveCourse(course)
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
        const {course} = this.state
        const {modules} = course
        //lo sacamos
        modules[source.droppableId].materialsIds.splice(source.index,1)
        const material = modules[source.droppableId].materials[draggableId]
        delete modules[source.droppableId].materials[draggableId]
        //lo metemos
        if(!modules[destination.droppableId].materialsIds) modules[destination.droppableId].materialsIds = []
        modules[destination.droppableId].materialsIds.splice(destination.index,0,draggableId)
        if(! modules[destination.droppableId].materials)  modules[destination.droppableId].materials = {}
        modules[destination.droppableId].materials[draggableId] = material
        //lo subimos
        course.modules = modules
        this.setState({course})
        this.saveCourse(course)
    }

    reorderModules = ({destination, source, draggableId})=>{
        const {course} = this.state
        const {modulesOrder} = course
        modulesOrder.splice(source.index,1)
        modulesOrder.splice(destination.index,0,draggableId)
        course.modulesOrder = modulesOrder
        this.saveCourse(course)
    }

    saveCourse = (course, button) => {
        //const {course} = this.state
        saveCourse(course)
        .then(key=>{
            this.setState({course})
            if(button) toastr.success('Se Actualizó')
        })
        .catch(e=>{
            toastr.error('No se pudo guardar')
        })        
    }

    changeName =(e) => {
        let {course} = this.state
        course.title = e.target.value
        this.setState({course})
    }

    componentWillMount(){
        let id = this.props.match.params.id
        if(this.props.match.params.id){
           getCourse(id)
           .then(course=>{
                if(!course) return this.props.history.push('/admin/courses')
                this.setState({course})
           })
           .catch(e=>console.log(e))
        }else{
            const {course} = this.state
            saveCourse(course)
            .then(_id=>{
                this.props.history.push(`/admin/courses/${_id}/edit`)
            })
            .catch(e=>console.log(e))
        }
    }

    render(){
        const {course} = this.state
        const {title, modulesOrder, modules} = course
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
                <nav>
                <article style={{display:'flex'}}>
                    <Input name="title" value={title} onChange={this.changeName} />
                    <FontAwesome
                            onClick={()=>this.saveCourse(course, true)}
                            name='save'
                            size='2x'
                            style={{ cursor:"pointer", color:'green', marginLeft:5, textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                </article> 
                <Button 
                    onClick={this.addModule}
                    type="primary">Agregar modulo</Button>
                </nav>
                <div className="modules-container">

                    {modulesOrder && modulesOrder.map((moduleId, index)=> {
                        const module = modules[moduleId]
                        const {materials={}, materialsIds=[]} = module
                        const mats = materialsIds.map(id=>materials[id])
                       
                        return <Module
                        courseId={course._id}
                        removeResource={this.removeResource}
                         addResource={this.addResource} 
                         removeModule={this.removeModule} 
                         onChange={this.onChangeModuleTitle} 
                         editModuleTitle={this.state.editModuleTitle}
                         onEdit={this.onEditModuleTitle} 
                         index={index} 
                         key={module._id} 
                         {...module} 
                         materials={mats}
                          />
                    })}
                </div>
                {provided.placeholder}
                </div>
            )}
            
            </Droppable>
            </DragDropContext>

        )
    }
}

export default  NewCourse