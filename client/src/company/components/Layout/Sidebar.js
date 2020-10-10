import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu, Icon, Drawer} from 'antd';

const {SubMenu} = Menu;
const MenuItem = Menu.Item
const {Sider} = Layout;

class Sidebar extends Component {

    render() {
        const {pathname} = this.props.location;
        let selectedKey = [];
        if (pathname != null) {
            selectedKey.push(pathname);
        }
        const {collapsed, isMobile, onCollapse} = this.props
        return (
            <>
            {
                isMobile ?
                <Drawer
                    placement='left'
                    closable={false}
                    onClose={onCollapse}
                    visible={collapsed}
                    bodyStyle={{
                        backgroundColor: '#001529',
                        minHeight: '100%',
                        padding: '24px 0'
                    }}>
                    <Sider
                        width={250}
                        style={{minHeight: '100vh', height: '100%'}}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={selectedKey}
                            style={{
                                height: '100vh'
                            }}
                            >
                            <MenuItem key = '/company/dashboard'>
                                <Link to = '/company/dashboard'>
                                    <Icon type = 'dashboard'/>
                                    <span>Dashboard</span>
                                </Link>
                            </MenuItem>
                            <SubMenu
                                key="Jobs"
                                title={
                                    <>
                                    <Icon type="bank"/>
                                    <span>
                                        Jobs
                                    </span>
                                    </>
                                }
                                >
                                <MenuItem key = '/company/job/create'>
                                    <Link to = '/company/job/create'>
                                        Create Jobs
                                    </Link>
                                </MenuItem>
                                <MenuItem key = '/company/job/manage'>
                                    <Link to = '/company/job/manage'>
                                        Manage Jobs
                                    </Link>
                                </MenuItem>
                            </SubMenu>
                            <MenuItem key = '/company/students'>
                                <Link to = '/company/students'>
                                    <Icon type = 'idcard'/>
                                    <span>Student Profiles</span>
                                </Link>
                            </MenuItem>
                            <MenuItem key = '/company/contact'>
                                <Link to = '/company/contact'>
                                    <Icon type = 'contacts'/>
                                    <span>Contact Us</span>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Sider>
                </Drawer>
                :
                <Sider
                    trigger={null}
                    width={250}
                    style={{height: '100vh', position: 'fixed' }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKey}
                        style={{
                            height: '100%'
                        }}
                        >
                        <MenuItem key = '/company/dashboard'>
                            <Link to = '/company/dashboard'>
                                <Icon type = 'dashboard'/>
                                <span>Dashboard</span>
                            </Link>
                        </MenuItem>
                        <SubMenu
                            key="Jobs"
                            title={
                                <>
                                <Icon type="bank"/>
                                <span>
                                    Jobs
                                </span>
                                </>
                            }
                            >
                            <MenuItem key = '/company/job/create'>
                                <Link to = '/company/job/create'>
                                    Create Jobs
                                </Link>
                            </MenuItem>
                            <MenuItem key = '/company/job/manage'>
                                <Link to = '/company/job/manage'>
                                    Manage Jobs
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem key = '/company/students'>
                            <Link to = '/company/students'>
                                <Icon type = 'idcard'/>
                                <span>Student Profiles</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key = '/company/contact'>
                            <Link to = '/company/contact'>
                                <Icon type = 'contacts'/>
                                <span>Contact Us</span>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Sider>

            }
            </>
        );
    }
}

export default withRouter(Sidebar);
