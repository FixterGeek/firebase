import React, { Component } from 'react';
import './Courses.css';
import {PayFormDisplay} from './PayFormDisplay';

class PayForm extends Component {
    componentDidMount () {
        window.scroll(0, 0)
    }

    render() {
        return (
            <div >
                <PayFormDisplay />
            </div>
        );
    }
}

export default PayForm;
