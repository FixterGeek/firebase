import React from 'react';
import './Courses.css';
import Nav from '../nav/Nav';
import log from '../../assets/bootcamp.png';

export const PayFormDisplay= () => (

    <div className="pay">
        <Nav />
        <div style={{padding:"130px 0 50px 0"}}>
            <h2 className="tittle " style={{textAlign:"center", color:"#ccc", fontFamily:"Muli"}}> Completa tus datos de pago</h2>
            <br/>
            <div className="flex_pay">
                <div className="boxi_form">
                    <form action="">
                        <label htmlFor="">Nombre del titular</label>
                        <input type="text" placeholder="Nombre completo"/>
                        <label htmlFor="">Numero de tarjeta</label>
                        <input  type="text" placeholder="---- ---- ---- ----"/>
                        <div style={{display:"flex"}}>
                            <div className="mitad">
                                <label htmlFor="">Fecha de expiracion</label><br/>
                                <input type="text" placeholder="MM/AA"/>
                            </div>
                            <div className="mitad" style={{marginLeft:"4%"}}>
                                <label htmlFor="">Codigo de seguridad</label><br/>
                                <input type="text" placeholder="CVV"/>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div className="mitad">
                                <label htmlFor="">Numero telefonico</label>
                                <input type="text" placeholder="333 - 333 - 33 - 33"/>
                            </div>
                            <div className="mitad" style={{marginLeft:"4%"}}>
                                <label htmlFor="">Codigo de seguridad</label>
                                <input type="text" placeholder="CVV"/>
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
                        <h3>"Firebase Intro"</h3>
                    </div>
                    <p>Resumen</p>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Precio</p><p>$29.00</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Descuento</p><p>$00.00</p>
                    </div>
                    <hr/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p>Total</p><p>$29.00</p>
                    </div>
                    <button className="btn_signin">Pagar</button>
                </div>
            </div>
        </div>
    </div>
);