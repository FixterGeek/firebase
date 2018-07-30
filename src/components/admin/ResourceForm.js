import React, {Component} from 'react'
import {Button, Modal, Input, Progress} from 'antd'
import PropTypes from 'prop-types'
import firebase from '../../services/firebase'

class ResourceForm extends Component{

    state = {
        visible:false,
        loading:false,
        videoFile:null,
        resource:{
            _id:'',
            title:'',
            desc:'',
            link:''
        },
        progress: 0
    }

    onChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        const {resource} = this.state
        resource[field] = value
        this.setState({resource})

    }

    saveFile = (e) => {
        this.setState({videoFile:e.target.files[0]})
    }

    uploadVideo = () => {
        const {resource} = this.state
        resource._id = firebase.database().ref('cursos').push().key
        resource.module = this.props.module._id
        console.log(this.state.videoFile)
        const uploadTask = firebase.storage().ref('videos')
        .child(resource._id)
        .put(this.state.videoFile)

        //progrso
        uploadTask.on('state_changed', (snap)=>{
            const progress = Math.floor((snap.bytesTransferred / snap.totalBytes) * 100)
            this.setState({progress})
        })

        //done
        uploadTask.then(()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=> {
                resource.link = downloadURL
                this.setState({resource})
                this.saveResource()
              });
        })
        .catch(e=>console.log(e))
        //this.setState({visible:!this.state.visible})
    }

    saveResource = () => {
        //se manda al modulo pa que lo guarde
        console.log(this.state.resource)
        this.props.addResource(this.state.resource)
        //se resetea
        this.setState({visible:false,loading:false,videoFile:null})
        

    }

    toggleForm = () => {
        this.setState({visible:!this.state.visible})
    }

    handleOk = (e) => {
        this.setState({
          loading: true,
        });
        this.uploadVideo()
        // this.setState({
        //   visible: false,

        // });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

    render(){
        const {loading, progress} = this.state;
        return(
            <div>
                <Button onClick={this.toggleForm} >
                    Add
                </Button>   
                <Modal
                    title={"Agrega un recurso para: " + this.props.module.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={loading}
                    >
                    <Progress percent={progress} status="active" />
                    <Input onChange={this.onChange} name="title" placeholder="Titulo" type="text" />
                        <br/>  
                    <Input onChange={this.onChange} name="desc" placeholder="Descripción" type="text" />
                    <br/> 
                    <Input onChange={this.onChange} name="otro" placeholder="Otro" type="text" />
                    <input onChange={this.saveFile} type="file" accept="video/*" />
                </Modal> 
            </div>
        )
    }
}

ResourceForm.protoTypes = {
    module: PropTypes.object.isRequired
}

export default ResourceForm