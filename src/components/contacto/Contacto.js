import React, { Component } from 'react';
import './Contacto.css';
import Nav from '../nav/Nav';

class Contacto extends Component {

    componentDidMount () {
        window.scroll(0, 0)
    }

    render() {
        return (
            <div className="contacto">
                <Nav />
                <div className="cover">
                    <div className="box_contact">
                        <h2>Let's make this official</h2>
                        <p className="texto">Save a spot for us in your inbox to stay in the know.</p>
                        <hr/>
                        <form action="">
                            <label htmlFor="">Nombre</label>
                            <input type="text" placeholder="Nombre" required/>
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder="hola@firebase.mx" required/>
                            <label htmlFor="">Teléfono</label>
                            <input type="password" placeholder="333 - 333 - 33 - 33"/>
                            <label htmlFor="">Mensaje</label>
                            <textarea type="password" placeholder="Escribe algo..."/>
                            <button className="btn_signin">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contacto;
