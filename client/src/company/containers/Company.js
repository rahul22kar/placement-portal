import React, {Component} from 'react';
import {Layout} from 'antd';
import Media from 'react-media';
import {connect} from 'react-redux';
import {withRouter, Switch, Redirect} from 'react-router-dom';

import {Page, Sidebar, Navbar} from '../components/Layout';
import Dashboard from './Dashboard/Dashboard';
import CreateProfile from './CreateProfile';
import Job from './Jobs';
import JAF from './JAF';
import StudentProfiles from './StudentProfiles';
import Contact from './Contact'
import CreateForm from './Form/LandingForm';
import MainForm from './Form/MainForm';

import CompanyRoute from '../../utils/CompanyRoute';
import * as actionCreators from "../../redux/actions";
import CompanyProfileRoute from "../../utils/CompanyProfileRoute";


class Company extends Component{

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
        if (this.props.location.pathname === "/company" || this.props.location.pathname === "/company/"){
            return <Redirect to="/company/dashboard"/>
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
                                    <CompanyRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={true}/>
                                    <CompanyRoute path={`${this.props.match.url}/profile/create`} component={CreateProfile} isMobile={true}/>
                                    <CompanyRoute path={`${this.props.match.url}/job`} component={Job} isMobile={true}/>
                                    <CompanyRoute path={`${this.props.match.url}/JAF`} component={JAF} isMobile={true}/>
                                    <CompanyProfileRoute path={`${this.props.match.url}/students`} component={StudentProfiles} isMobile={true}/>
                                    <CompanyRoute path={`${this.props.match.url}/pre_form`} component={CreateForm} isMobile={true}/>
                                    <CompanyRoute path={`${this.props.match.url}/create_form`} component={MainForm} isMobile={true} render = {(props) => <MainForm {...props} />}/>
                                    <CompanyRoute path={`${this.props.match.url}/contact`} component={Contact} isMobile={true}/>
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
                                        <CompanyRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/profile/create`} component={CreateProfile} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/job`} component={Job} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/JAF`} component={JAF} isMobile={false}/>
                                        <CompanyProfileRoute path={`${this.props.match.url}/students`} component={StudentProfiles} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/contact`} component={Contact} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/pre_form`} component={CreateForm} isMobile={false}/>
                                        <CompanyRoute path={`${this.props.match.url}/create_form`} component={MainForm} isMobile={false} render = {(props) => <MainForm {...props} />}/>
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
    loading: state.company_profile.loading,
    profileExists: state.company_profile.profileExists,
    collapsed: state.ui.collapsed
});

const mapDispatchToProps = dispatch => {
    return {
        onCollapseChange: () => dispatch(actionCreators.onCollapseChange()),
        onLogout: () => dispatch(actionCreators.authLogout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
