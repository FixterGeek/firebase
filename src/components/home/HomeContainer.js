import React, { Component } from 'react';
import './Home.css';
import Slide from './Slide';
import Nav from '../nav/Nav';
import About from './About';
import Courses from './Courses';
import Startups from './Startups';
import Footer from '../footer/Footer';

class HomeContainer extends Component {
    render() {
        return (
            <div className="home">
                <Nav />
                <Slide />
                <About />
                <Courses />
                <Startups />
                <Footer />
            </div>
        );
    }
}

export default HomeContainer;
