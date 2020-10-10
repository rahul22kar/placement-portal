import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';

import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import AddExperience from './AddExperience';
import AddProject from './AddProject';
import Contact from '../../../company/components/Contact';

import StudentRoute from "../../../utils/StudentRoute";
import StudentProfileRoute from "../../../utils/StudentProfileRoute";

import TempComponent from './TempComponent';
import CreateQuery from "./CreateQuery";
import ReportBug from "./ReportBug";
import Announcements from "./Announcements";
import ResetPassword from "./ResetPassword";

class Profile extends Component {
    render() {
        const {isMobile} = this.props;
        return (
            <div>
                <Switch>
                    <StudentRoute exact path={`${this.props.match.url}/create`} component={CreateProfile} />
                    <StudentProfileRoute exact path={`${this.props.match.url}/edit`} component={EditProfile} isMobile={isMobile}/>
                    <StudentProfileRoute exact path={`${this.props.match.url}/add_experience`} component={AddExperience} />
                    <StudentProfileRoute exact path={`${this.props.match.url}/add_project`} component={AddProject} />
                    <StudentRoute exact path={`${this.props.match.url}/query`} component={CreateQuery} />
                    <StudentRoute exact path={`${this.props.match.url}/report_bug`} component={ReportBug} />
                    <StudentRoute exact path={`${this.props.match.url}/contact_us`} component={Contact} />
                    <StudentProfileRoute exact path={`${this.props.match.url}/announcements`} component={Announcements} />
                    <StudentProfileRoute path={`${this.props.match.url}/reset_password`} component={ResetPassword}/>
                    <StudentProfileRoute path={`${this.props.match.url}`} component={TempComponent}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Profile);
