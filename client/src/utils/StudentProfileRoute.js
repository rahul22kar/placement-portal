import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const StudentProfileRoute = ({component: Component, auth, profile, isMobile,...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true && auth.loggedUserRole === 'student' && profile.profileExists ? (
                <Component {...props} isMobile={isMobile}/>
            ) : (
                <Redirect to={{
                    pathname: "/student/dashboard",
                    state: { from: props.location }
                }} />
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(StudentProfileRoute);
