import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const CompanyProfileRoute = ({component: Component, auth, profile, isMobile,...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true && auth.loggedUserRole === 'company' && profile.profileExists ? (
                <Component {...props} isMobile={isMobile}/>
            ) : (
                <Redirect to={{
                    pathname: "/company/dashboard",
                    state: { from: props.location }
                }} />
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.company_profile
});

export default connect(mapStateToProps)(CompanyProfileRoute);
