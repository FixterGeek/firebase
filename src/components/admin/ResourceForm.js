import React, {Component} from 'react'
import {Button, Modal, Input, Progress} from 'antd'
import PropTypes from 'prop-types'
import firebase from '../../services/firebase'

//testing
import ReactMarkdown from 'react-markdown'
import { readAsMarkdown, convertToRawUrl } from '../../services/markDownReader';


const origin ={
    _id:'',
    title:'',
    desc:'',
    link:'',
    text:false,
    link:false
}

class ResourceForm extends Component{

    state = {
        visible:false,
        loading:false,
        videoFile:null,
        resource:Object.assign({},origin),
        progress: 0,
        videoModal: true
        
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
        const {courseId} = this.props
        resource._id = firebase.database().ref('cursos').push().key
        resource.module = this.props.module._id
        //si no hay video
        if(!this.state.videoFile) return this.saveResource(resource)
        

        //obtener duración del video
        this.getVideoDuration(resource)

        const uploadTask = firebase.storage().ref('videos').child(courseId)
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
                resource.type = "VIDEO"
                this.setState({resource})
                this.saveResource(resource)
              });
        })
        .catch(e=>console.log(e))
        //this.setState({visible:!this.state.visible})
    }

    getVideoDuration = (resource) => {
        const file = this.state.videoFile
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          //window.URL.revokeObjectURL(video.src); //??
          const duration = video.duration;
          resource.duration = duration
          this.setState({resource})
          //console.log(resource)
        }
        video.src = URL.createObjectURL(file);
    }

    saveResource = (resource) => {
        //se manda al modulo pa que lo guarde
        this.props.addResource(resource)
        //se resetea
        this.setState({resource:Object.assign({},origin),progress:0,visible:false,loading:false,videoFile:null})
        if(resource.type === "VIDEO")  this.refs.fileInput.value = null
       

    }

    toggleForm = (lecture) => {
        if(lecture) this.setState({videoModal:false})
        else this.setState({videoModal:true})
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
        this.setState({resource:Object.assign({},origin),progress:0,visible:false,loading:false,videoFile:null})

      }

      getMarkDownLink = (input) => {
          //this.setState({loading:true})
          const linktoSave = convertToRawUrl(input.value)
          const {resource}  = this.state
          resource.link = linktoSave
          resource.type = "GITHUB"
          this.setState({resource})
          //preview
          readAsMarkdown(linktoSave)
          .then(text=>{
              resource.text = text
              this.setState({resource})
          })

      }

    render(){
        const {loading, progress, resource, videoModal} = this.state;
        return(
            <div>
                


                <Button onClick={()=>this.toggleForm()} >
                    Add Video
                </Button>  

                <Button onClick={()=>this.toggleForm('lecture')} >
                    Add Lecture
                </Button>  

                {!videoModal && !resource.text &&  <Modal
                    title={"Agrega una Lectura para: " + this.props.module.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={loading}
                    >
                    {loading && <Progress showInfo={false} percent={100} status={'active'} />}
                    <Input value={resource.title} onChange={this.onChange} name="title" placeholder="Titulo" type="text" />
                        <br/>  
                    <Input ref="githubLink" name="otro" placeholder="Link de github" type="text" />
                    <hr/>
                    <Button onClick={()=>this.getMarkDownLink(this.refs.githubLink.input)}>Obtener</Button>
                    
                </Modal> }

                {videoModal && !resource.text && <Modal
                    title={"Agrega un Video para: " + this.props.module.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={loading}
                    >
                    <Progress percent={progress} status={progress == 100 ? 'success' : 'active'} />
                    <Input value={resource.title} onChange={this.onChange} name="title" placeholder="Titulo" type="text" />
                        <br/>  
                    <Input value={resource.desc} onChange={this.onChange} name="desc" placeholder="Descripción" type="text" />
                    <br/> 
                    <Input value={resource.otro} onChange={this.onChange} name="otro" placeholder="Otro" type="text" />
                    <input ref="fileInput" onChange={this.saveFile} type="file" accept="video/*" />
                    <hr/>
                    <p>
                    
                    </p>
                </Modal> }

                {resource.text && <Modal
                    title={"Agrega un Video para: " + this.props.module.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={loading}
                    >
                   {/* <p dangerouslySetInnerHTML={{__html:}} ></p>   */}
                   <Input value={resource.title} onChange={this.onChange} name="title" placeholder="Titulo" type="text" />
                        <br/>  

                   <ReactMarkdown source={resource.text} /> 
                </Modal> }
            
            </div>
        )
    }
}

ResourceForm.protoTypes = {
    module: PropTypes.object.isRequired
}

export default ResourceForm

//<ReactMarkdown source={resource.text} />