import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './components/home/HomeContainer';
import Login from './components/login/Login';
import NewCourse from './components/admin/NewCourse'
import {RegisterDisplay} from './components/login/RegisterDisplay' ;
import Profile from './components/profile/Profile';
import Historial from './components/profile/historial/Historial';
import Courses from './components/courses/Courses';
import {CourseDetailDisplay} from './components/courses/CourseDetailDisplay';
import CoursesPage from './components/admin/CoursesPage'
import CourseDetail from './components/admin/CourseDetail'
import CourseDetailContainer from './components/courses/CourseDetailContainer';
import {ViewVideoDisplay} from './components/courses/ViewVideoDisplay';
import Eventos from './components/event/Eventos';
import Contacto from './components/contacto/Contacto';
import HistoryDisplay from './components/history/HistoryContainer';
import PayForm from './components/courses/PayForm';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterDisplay}/>
        <Route exact path="/profile" component={Profile}/>
        <Route path="/profile/history" component={Historial}/>
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/courses/:id" component={CourseDetailContainer}/>
        <Route path="/courses/:id/intro" component={ViewVideoDisplay}/>
        <Route path="/events" component={Eventos}/>
        <Route path="/contact" component={Contacto}/>
        <Route path="/history" component={HistoryDisplay}/>
        <Route path="/courses/:id/pay" component={PayForm}/>
        {/* Admin  */}
        <Route path="/admin/courses/:id/edit" component={NewCourse} />
        <Route path="/admin/courses/new" component={NewCourse} />
        <Route exact path="/admin/courses/" component={CoursesPage} />
        <Route path="/admin/courses/:id" component={CourseDetail} />
    </Switch>
);

export default Routes;
