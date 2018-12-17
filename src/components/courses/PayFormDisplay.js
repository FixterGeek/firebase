import React from 'react';
import './Courses.css';
import Nav from '../nav/Nav';
import log from '../../assets/bootcamp.png';
import {Spin} from 'antd'
import Cleave from 'cleave.js/react';
import PaypalButton from './PaypalButton';
import toastr from 'toastr';

import './PayFormDisplay.css';


let cupon = ''

function onCreditCardFocus(){}

function onCreditCardChange(event) {
    // formatted pretty value
    console.log(event.target.value);

    // raw value
    console.log(event.target.rawValue);
}

let CLIENT = {
	sandbox: 'AYBxcD07b04dFGPyuYwku2x_xmAZURiROXO_lPD01U8m-colu58D9T1HM1SSgm1hnBnCj8RwWxyuHwLk',
		production: '<insert production client id>'
};

let ENV = 'sandbox';

export const PayFormDisplay= ({course, pagar, onChange, errors, loading, applyCupon, HandlePaypalSuccess}) => {
    let {coupon={}, price} = course
    let total = Number(price) - 250

	const onSuccess = () => {
		HandlePaypalSuccess();
	};

	const onError = (error) => {
		toastr.error("Error al procesar el pago");
	};

	const onCancel = () => toastr.error("Proceso cancelado");

    return(
    <div className="pay">
        <Nav />
        <div style={{padding:"130px 0 50px 0"}}>
            <h2 className="tittle " style={{textAlign:"center", color:"#ccc", fontFamily:"Muli"}}>
             Completa tus datos de pago
             {loading && <Spin />}
             </h2>
            <br/>
            <div className="flex_pay">
                <div className="boxi_form">
                    <form action="">
                        <label htmlFor="">Nombre del titular</label>
                        <input onChange={onChange} name="name" type="text" placeholder="Nombre completo"/>
                        <label htmlFor="">Numero de tarjeta</label>

                        <Cleave placeholder="---- ---- ---- ----"
                                options={{creditCard: true}}
                                onFocus={this.onCreditCardFocus}
                                name="number"
                                //type="text"
                                onChange={onChange} />

                        <div style={{display:"flex"}}>
                            <div className="mitad">
                                <label htmlFor="">Fecha de expiracion</label><br/>
                                <input minLength="2" maxLength="2" style={{width:100}} onChange={onChange} name="exp_month" type="text" placeholder="MM"/>
                                <input minLength="4" maxLength="4" style={{width:100}} onChange={onChange} name="exp_year" type="text" placeholder="AAAA"/>
                            </div>
                            <div className="mitad" style={{marginLeft:"4%"}}>
                                <label htmlFor="">Codigo de seguridad</label><br/>
                                <input minLength="3" maxLength="4" style={{width:100}} onChange={onChange} name="cvc"  type="text" placeholder="CVC"/>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div className="mitad">
                                <label htmlFor="">Numero telefónico</label>
                                <input className={errors.tel && "error"} minLength="10" onChange={onChange} name="tel"  type="text" placeholder="333 - 333 - 33 - 33"/>
                                {<h2 style={{color:"red"}} > {errors.tel}</h2>}
                            </div>

                        </div>
                        <span >
                            <input type="checkbox" className="check" value="on"/>
                            Acepto terminos y condiciones
                        </span>

                    </form>

									<div>
										<h3 className="payment-methods--title">Otras formas de pago</h3>

										<div>
											<PaypalButton
												client={CLIENT}
												env={ENV}
												commit={true}
												currency={'MXN'}
												total={ !coupon.discount ? total : coupon.percentage ?  total * (1 - coupon.discount * .01)  : total - coupon.discount }
												onSuccess={onSuccess}
												onError={onError}
												onCancel={onCancel}
											/>
										</div>

									</div>

                </div>
                <div className="summary">
                    <div className="img_pay">
                        <img src={log} alt=""/>
                        <h3>{course.title || "Firebase Intro"}</h3>
                    </div>
                    <p>Resumen</p>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Precio</p><p>${price}.00</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Descuento por lanzamiento</p><p>$250.00</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Cupon  {coupon._id && " | " + coupon._id}</p><p>{coupon.percentage ? null : "$"}  {coupon.discount || 0} {coupon.percentage ? "%":"MXN"} </p>
                    </div>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Total</p><p>$ { !coupon.discount ? total : coupon.percentage ?  total * (1 - coupon.discount * .01)  : total - coupon.discount }.00 MXN</p>
                    </div>
                    <div style={{display:'flex', width:400}}>
                        <input onChange={e=>cupon=e.target.value} style={{color:'orange'}} type="text" />
                        <button onClick={()=>applyCupon(cupon)} style={{cursor:'pointer',backgroundColor:'white', color:'orange'}} >Aplicar Cupon</button>
                    </div>
                    <hr />
                    <button disabled={loading} onClick={pagar} className="btn_signin">
                        {loading ? <Spin /> : "pagar"}
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}
