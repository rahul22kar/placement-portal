import React, {Component} from 'react'
import {Layout} from 'antd'
import Media from 'react-media'
import {connect} from 'react-redux'
import {withRouter, Switch, Redirect} from 'react-router-dom'

import {Page, Sidebar, Navbar} from '../components/Layout'
import Dashboard from './Dashboard/Dashboard'
import Profile from './Profile/Profile'
import Jobs from './Jobs/Jobs'

import StudentRoute from '../../utils/StudentRoute'
import * as actionCreators from "../../redux/actions"


class Student extends Component{

    onCollapse = () => {
        this.props.onCollapseChange()
    };

    render(){
        const {onLogout, loading, collapsed} = this.props;
        const {onCollapse} = this;

        const sidebarProps = {
            collapsed,
            onCollapse
        };
        const navbarProps = {
            onCollapse,
            collapsed,
            onLogout
        };

        const pageProps = {
            loading: loading.page
        };

        if (this.props.location.pathname === "/student" || this.props.location.pathname === "/student/"){
            return <Redirect to="/student/dashboard"/>
        }
        return(
            <Media query={{maxWidth: '1224px'}}>
                {matches =>
                    matches ?
                    <Layout>
                        <Sidebar {...sidebarProps} isMobile={true}/>
                        <Layout>
                            <Navbar {...navbarProps}/>
                            <Page {...pageProps} isMobile={true}>
                                <Switch>
                                    <StudentRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={true}/>
                                    <StudentRoute path={`${this.props.match.url}/profile`} component={Profile} isMobile={true}/>
                                    <StudentRoute path={`${this.props.match.url}/jobs`} component={Jobs} isMobile={true}/>
                                </Switch>
                            </Page>
                        </Layout>
                    </Layout>
                    :
                    <Layout>
                        <Sidebar {...sidebarProps} isMobile={false}/>
                        <Layout style={sidebarProps.collapsed ? {marginLeft: 80, transition: "all 0.2s ease-in-out"} : {marginLeft: 250}}>
                            <Navbar {...navbarProps}/>
                            <Page {...pageProps} isMobile={false}>
                                <Switch>
                                    <StudentRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={false}/>
                                    <StudentRoute path={`${this.props.match.url}/profile`} component={Profile} isMobile={false}/>
                                    <StudentRoute path={`${this.props.match.url}/jobs`} component={Jobs} isMobile={false}/>
                                </Switch>
                            </Page>
                        </Layout>
                    </Layout>
                }
            </Media>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.loggedUser,
    loading: state.profile.loading,
    collapsed: state.ui.collapsed
});

const mapDispatchToProps = dispatch => {
    return {
        onCollapseChange: () => dispatch(actionCreators.onCollapseChange()),
        onLogout: () => dispatch(actionCreators.authLogout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Student));
