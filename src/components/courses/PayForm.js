import React, { Component } from 'react';
import './Courses.css';
import {PayFormDisplay} from './PayFormDisplay';
import firebase, {paymentAccepted} from '../../services/firebase';
import toastr from 'toastr'

class PayForm extends Component {

    state = {
        course:{},
        user:{}
    }

    componentWillMount(){
        this.getCourseId()
        this.getUser()
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    getCourseId = () => {
        const id = this.props.match.params.id
        if(!id) this.props.history.push('/courses')        
        return firebase.database().ref('cursosInfo').child(id)
        .once('value')
        .then(snap=>{
            if(!snap.val()) return this.props.history.push('/courses')
            this.setState({course:snap.val()})
        })
        
        
    }

    getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
    }

    pagar = () => {
        //aqui va el cargo al server y promesa de vuelta
        //una vez aceptado el pago, enrolamos al usuario

        /** se usa cloud function!! en el sercicio ;) */
        const data = {
            courseId: this.props.match.params.id,
            userId: this.state.user.uid
        }
        paymentAccepted(data)
        .then(courseId=>{
            this.props.history.push('/courses/' + courseId)
        })
        .catch(e=>{
            console.log(e)
            toastr.error(e)
        })
    }

    render() {
        const {course} = this.state
        return (
            <div  >
                <PayFormDisplay 
                    pagar={this.pagar}
                    course={course} 
                />
            </div>
        );
    }
}

export default PayForm;
