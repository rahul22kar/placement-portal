import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';

import ManageJobs from './ManageJobs/ManageJobs'
import ListStudents from './ManageJobs/ListStudentsModal'
import CreateJob from './CreateJob/CreateJob'

import CompanyRoute from "../../../utils/CompanyRoute";
import CompanyProfileRoute from "../../../utils/CompanyProfileRoute";


class Job extends Component {
    render() {
        const {isMobile} = this.props
        return (
            <div>
                <Switch>
                    <CompanyProfileRoute exact path={`${this.props.match.url}/create`} component={CreateJob} />
                    <CompanyProfileRoute exact path={`${this.props.match.url}/manage`} component={ManageJobs} isMobile={isMobile}/>
                    <CompanyProfileRoute exact path={`${this.props.match.url}/student`} component={ListStudents} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Job);
