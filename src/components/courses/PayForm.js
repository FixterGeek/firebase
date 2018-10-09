import React, { Component } from 'react';
import './Courses.css';
import {PayFormDisplay} from './PayFormDisplay';
import firebase, {paymentAccepted, getCourseInfo, applyCoupon} from '../../services/firebase';
import toastr from 'toastr'
//import * as Conekta from '../../services/conekta'
import Conekta from '../../services/conekta'



class PayForm extends Component {

    state = {
        loading:false,
        course:{
            price: 1250
        },
        user:{},
        card:{
            "number": "4242424242424242",
            "name": "Javier Pedreiro",
            "exp_year": "2018",
            "exp_month": "12",
            "cvc": "123",
            tel:"777777777777"
          },
          errors:{},
          conekta:null,
          coupon:null
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
        this.setState({conekta:new Conekta()})
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
        if(!this.validateCard() && this.state.conekta ) return
        this.setState({loading:true})
        //aqui va la tokenización a conekta y promesa de vuelta
        //Conekta = window.Conekta
        //Conekta.setPublicKey('key_Ik4WxMhXctrriTvyfMAimyg');
        this.state.conekta.api.Token.create({card:this.state.card}, token=>{
            console.log(token)
            this.setState({loading:false})
        }, err=>console.log(err));
        //una vez aceptado el pago, enrolamos al usuario

        /** se usa cloud function!! en el servicio ;) */
        // const data = {
        //     courseId: this.props.match.params.id,
        //     userId: this.state.user.uid
        // }
        // paymentAccepted(data)
        // .then(courseId=>{
        //     this.props.history.push('/courses/' + courseId)
        // })
        // .catch(e=>{
        //     console.log(e)
        //     toastr.error(e)
        // })
    }

    applyCupon = (cupon) => {
        this.setState({loading:true})
        applyCoupon(cupon)
        .then(coupon=>{
            console.log(coupon)
            const {course} = this.state
            course.coupon = coupon
            console.log(course)
            this.setState({course, loading:false,coupon})
            toastr.success("Cupon aplicado")
        })
        .catch(e=>{
            toastr.error("Este cupon no es valido")
            this.setState({loading:false})
        })
    }



   

    render() {
        const {course, errors, loading} = this.state
        return (
            <div  >
                <PayFormDisplay 
                    loading={loading}
                    pagar={this.pagar}
                    course={course} 
                    onChange={this.onChange}
                    errors={errors}
                    applyCupon={this.applyCupon}
                />
            </div>
        );
    }
}

export default PayForm;
