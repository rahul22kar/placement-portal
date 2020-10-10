import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';
import AdminRoute from "../../../utils/AdminRoute";

import CreateLogin from "./CreateLogin";
import CompayProfiles from "./ViewProfile"


class Companies extends Component {
    render() {

        const {isMobile} = this.props

        return (
            <div>
                <Switch>
                    <AdminRoute path={`${this.props.match.url}/create`} component={CreateLogin} isMobile={isMobile}/>
                    <AdminRoute path={`${this.props.match.url}/profile`} component={CompayProfiles} isMobile={isMobile}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Companies);
