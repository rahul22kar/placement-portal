import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';
import JobApplications from "./JobApplications";
import ManageApplications from "./ManageApplications"
import StudentProfileRoute from "../../../utils/StudentProfileRoute";
import TempComponent from "../Profile/TempComponent";

class Jobs extends Component {
    render() {
        return (
            <Switch>
                <StudentProfileRoute exact path={`${this.props.match.url}/application`} component={JobApplications} />
                <StudentProfileRoute exact path={`${this.props.match.url}/manage`} component={ManageApplications} />
                <StudentProfileRoute path={`${this.props.match.url}`} component={TempComponent}/>
            </Switch>
        );
    }
}

export default withRouter(Jobs);