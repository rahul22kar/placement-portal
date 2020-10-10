import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';
import AdminRoute from "../../../utils/AdminRoute";

import AllProfiles from "./AllProfiles";
import ReviewProfiles from "./ReviewProfiles";
import CreateAnnouncements from "./CreateAnnouncements";
//import ConfigurePortal from "./ConfigurePortal";

class Student extends Component {
    render() {

        const {isMobile} = this.props;

        return (
            <div>
                <Switch>
                    <AdminRoute path={`${this.props.match.url}/student_profiles`} component={AllProfiles} isMobile={isMobile}/>
                    <AdminRoute path={`${this.props.match.url}/review_student_profiles`} component={ReviewProfiles} isMobile={isMobile}/>
                    <AdminRoute path={`${this.props.match.url}/create_announcements`} component={CreateAnnouncements} isMobile={isMobile}/>
                    {/*<AdminRoute path={`${this.props.match.url}/configure_portal`} component={ConfigurePortal} isMobile={isMobile}/>*/}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Student);
