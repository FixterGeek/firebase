import React from 'react';
import './Courses.css';
import Nav from '../nav/Nav';
import log from '../../assets/bootcamp.png';
import {Spin} from 'antd'

let cupon = ''

export const PayFormDisplay= ({course, pagar, onChange, errors, loading, applyCupon}) => {
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
                        <input onChange={onChange} name="number"  type="text" placeholder="---- ---- ---- ----"/>
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
                </div>
                <div className="summary">
                    <div className="img_pay">
                        <img src={log} alt=""/>
                        <h3>{course.title || "Firebase Intro"}</h3>
                    </div>
                    <p>Resumen</p>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Precio</p><p>$1,250.00</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Descuento</p><p>$250.00</p>
                    </div>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Total</p><p>$1000.00</p>
                    </div>
                    <div style={{display:'flex', width:400}}>
                        <input onChange={e=>cupon=e.target.value} style={{color:'orange'}} type="text" />
                        <button onClick={()=>applyCupon(cupon)} style={{cursor:'pointer',backgroundColor:'white', color:'orange'}} >Aplicar Cupon</button>
                    </div>
                    
                    <button disabled={loading} onClick={pagar} className="btn_signin">
                        {loading ? <Spin /> : "pagar"}
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}