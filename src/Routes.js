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

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterDisplay}/>
        <Route exact path="/profile" component={Profile}/>
        <Route path="/profile/history" component={Historial}/>
        <Route exact path="/courses" component={Courses}/>
        <Route path="/courses/id" component={CourseDetailDisplay}/>
        {/* Admin  */}
        <Route path="/admin/courses/new" component={NewCourse} />
    </Switch>
);

export default Routes;
