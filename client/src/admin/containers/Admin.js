import React, {Component} from 'react'
import {Layout} from 'antd'
import Media from 'react-media'
import {connect} from 'react-redux'
import {withRouter, Switch, Redirect} from 'react-router-dom'
import {Page, Sidebar, Navbar} from '../components/Layout'

import AdminRoute from '../../utils/AdminRoute';
import * as actionCreators from "../../redux/actions";
import Dashboard from "../containers/Dashboard/Dashboard";
import Students from "../containers/Students";
import Companies from "../containers/Companies";

class Admin extends Component{
    onCollapse = () => {
        this.props.onCollapseChange()
    };
    render(){
        const {onLogout, loading, collapsed} = this.props;

        const sidebarProps = {
            collapsed,
            onCollapse: this.onCollapse
        };
        const navbarProps = {
            onCollapse: this.onCollapse,
            collapsed,
            onLogout
        };

        const pageProps = {
            loading
        };

        if (this.props.location.pathname === "/admin" || this.props.location.pathname === "/admin/"){
            return <Redirect to="/admin/dashboard"/>
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
                                        <AdminRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={true}/>
                                        <AdminRoute path={`${this.props.match.url}/student`} component={Students} isMobile={true} />
                                        <AdminRoute path={`${this.props.match.url}/company`} component={Companies} isMobile={true} />
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
                                        <AdminRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} isMobile={false}/>
                                        <AdminRoute path={`${this.props.match.url}/student`} component={Students} isMobile={false} />
                                        <AdminRoute path={`${this.props.match.url}/company`} component={Companies} isMobile={false} />
                                    </Switch>
                                </Page>
                            </Layout>
                        </Layout>
                }
            </Media>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.admin.page_loading,
    collapsed: state.ui.collapsed
});

const mapDispatchToProps = dispatch => {
    return {
        onCollapseChange: () => dispatch(actionCreators.onCollapseChange()),
        onLogout: () => dispatch(actionCreators.authLogout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
