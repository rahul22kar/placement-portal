import React, {Component} from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from './authentication/containers/Login';
import Register from './authentication/containers/Register';

import Student from "./students/containers/Student"
import Company from './company/containers/Company'
import Admin from './admin/containers/Admin'

import StudentRoute from './utils/StudentRoute';
import CompanyRoute from './utils/CompanyRoute';
import AdminRoute from './utils/AdminRoute';

import store from "../src/redux/store";
import * as actionCreators from '../src/redux/actions/index';
import throttle from 'lodash/throttle';

import "./App.css";

class App extends Component {

    componentDidMount() {
        store.dispatch(throttle(actionCreators.authCheckState(), 1000));
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/email_confirmed" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <CompanyRoute path="/company" component={Company}/>
                        <StudentRoute path="/student" component={Student}/>
                        <AdminRoute path="/admin" component={Admin}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
