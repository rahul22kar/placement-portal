import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const StudentRoute = ({component: Component, auth, isMobile, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true && auth.loggedUserRole === 'student' ? (
                <Component {...props} isMobile={isMobile}/>
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: { from: props.location }
                }} />
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(StudentRoute);
