import React, { Component } from "react"
import { Layout, Menu, Icon, Row, Col, Drawer} from "antd"
import {Link, withRouter} from 'react-router-dom'

import store from '../../../../redux/store';
import {authLogout} from "../../../../redux/actions";

const { Header, Sider } = Layout;

const MenuItem = Menu.Item

class MobileLayout extends Component{

    state = {
        visible: false
    }

    handleLogout = () => {
        store.dispatch(authLogout());
        this.props.history.push("/");
    }

    handleTrigger = () => {
        this.setState({
            visible: true
        })
    }

    handleClose = () => {
        this.setState({
            visible: false
        })
    }

    render(){
        const {pathname} = this.props.location;
        let selectedKey = [];

        if (pathname != null) {
            let path_array = pathname.split('/')
            let key = path_array[2]
            selectedKey.push(key);
        }

        return(
            <Layout>
                <Drawer
                    placement='left'
                    closable={false}
                    onClose={this.handleClose}
                    visible={this.state.visible}
                    bodyStyle={{
                        backgroundColor: '#001529',
                        minHeight: '100%',
                        padding: '24px 0'
                    }}
                    >
                    <div style={{margin: 20}}>

                    </div>
                    <Menu
                        theme = 'dark'
                        mode = 'inline'
                        selectedKeys = {selectedKey}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            width: '100vw'
                        }}
                        >
                        <MenuItem key = 'dashboard'>
                            <Link to = '/company/dashboard'>
                                <Icon type = 'dashboard'/>
                                <span>Dashboard</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key = 'createjob'>
                            <Link to = '/company/createjob'>
                                <Icon type = 'form'/>
                                <span>Create Jobs</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key = 'managejobs'>
                            <Link to = '/company/managejobs'>
                                <Icon type = 'edit'/>
                                <span>Manage Jobs</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key = 'studentprofiles'>
                            <Link to = '/company/studentprofiles'>
                                <Icon type = 'idcard'/>
                                <span>Student Profiles</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key = 'contactus'>
                            <Link to = '/company/contactus'>
                                <Icon type = 'contacts'/>
                                <span>Contact Us</span>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Drawer>
                <Layout>
                    <Header style={{background: '#fff', padding: '0 12px'}}>
                        <Menu
                            style={{
                                lineHeight:'64px',
                                width: '100%'
                            }}
                            mode='horizontal'
                            theme='light'
                            selectable={false}
                        >
                            <Menu.Item key='trigger' style={{float: 'left'}} onClick={this.handleTrigger}>
                                <Icon type='menu-unfold' style={{fontSize: '1.2rem'}}/>
                            </Menu.Item>
                            <Menu.Item key='logout' style={{float: 'right'}} onClick={this.handleLogout}>
                                Logout
                            </Menu.Item>
                            <Menu.Item key='help' style={{float: 'right'}}>
                                Help
                            </Menu.Item>
                        </Menu>
                    </Header>
                    {this.props.children}
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(MobileLayout)
