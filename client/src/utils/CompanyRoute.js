import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const CompanyRoute = ({component: Component, auth, isMobile, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true && auth.loggedUserRole ==='company' ? (
                <Component {...props} isMobile={isMobile}/>
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: { from: props.location }
                }}/>
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CompanyRoute);
