import React, { Component } from 'react';
import './Courses.css';
import {PayFormDisplay} from './PayFormDisplay';
import firebase, {paymentAccepted, getCourseInfo} from '../../services/firebase';
import toastr from 'toastr'
//import * as Conekta from '../../services/conekta'
let Conekta;



class PayForm extends Component {

    state = {
        course:{},
        user:{},
        card:{
            "number": "4242424242424242",
            "name": "Javier Pedreiro",
            "exp_year": "2018",
            "exp_month": "12",
            "cvc": "123",
            tel:"777777777777"
          },
          errors:{}
    }

    onChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        const {card} = this.state

        if(field === "exp"){

        }else{
            card[field] = value
        }

        
        this.setState({card})
    }

    componentWillMount(){
        this.loadScriptURL()
        this.getCourseId()
        this.getUser()
    }

    componentDidMount () {
        window.scroll(0, 0)
    }

    getCourseId = () => {
        const id = this.props.match.params.id
        if(!id) this.props.history.push('/courses')        
        return getCourseInfo(id)
        .then(course=>{
            if(!course) return this.props.history.push('/courses')
            this.setState({course})
        })
        
        
    }

    getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user) return this.props.history.push('/login')
        this.setState({user})
    }

    validateCard = () => {
        const errors = {}
        let error = false
        const {card} = this.state
        //console.log(card)
        for(let k in card){
            if(!card[k]){
                error = true
                errors[k] = "Completa este campo"
            }
        }
        this.setState({errors})
        return !error
        
    }

    pagar = () => {
        if(!this.validateCard()) return
        //aqui va la tokenización a conekta y promesa de vuelta
        //Conekta = window.Conekta
        //Conekta.setPublicKey('key_Ik4WxMhXctrriTvyfMAimyg');
        window.Conekta.Token.create({card:this.state.card}, token=>console.log(token), err=>console.log(err));
        //una vez aceptado el pago, enrolamos al usuario

        /** se usa cloud function!! en el servicio ;) */
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

    loadScriptURL () {
        console.log("segun")
        const script = document.createElement('script')
        script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
        script.async = 1
        script.onload = () => {
            console.log("ya", window.Conekta)
          if (window.Conekta !== undefined) {
            console.log("Exito", window.Conekta)
            window.Conekta.setPublishableKey("key_Ik4WxMhXctrriTvyfMAimyg")
          }
        }
        script.onerror = () => {
          console.log('error')
          throw new Error('Error: Conekta script wasn\'t loaded.')
        }
        document.body.appendChild(script)
      }
      
    

   

    render() {
        const {course, errors} = this.state
        return (
            <div  >
                <PayFormDisplay 
                    pagar={this.pagar}
                    course={course} 
                    onChange={this.onChange}
                    errors={errors}
                />
                <script type="text/javascript" data-conekta-public-key="key_KJysdbf6PotS2ut2" src="https://cdn.conekta.io/js/v1.0.1/conekta.js"></script>
            </div>
        );
    }
}

export default PayForm;
