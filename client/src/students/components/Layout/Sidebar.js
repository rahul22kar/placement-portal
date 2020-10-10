import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Layout, Menu, Icon, Drawer} from 'antd';

const {SubMenu} = Menu;
const {Sider} = Layout;

class Sidebar extends Component {

    render() {
        const {pathname} = this.props.location;
        let selectedKey = [];
        if (pathname != null) {
            selectedKey.push(pathname);
        }
        const {collapsed, isMobile, onCollapse} = this.props;
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
                        style={{minHeight: '100vh', height: '100%'}}
                    >
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={selectedKey}
                            style={{
                                height: '100vh'
                            }}
                        >
                            <Menu.Item key='/student/dashboard'>
                                <NavLink to="/student/dashboard"><Icon type="dashboard"/><span>Dashboard</span></NavLink>
                            </Menu.Item>
                            <Menu.Item key='/student/profile/announcements'>
                                <NavLink to="/student/profile/announcements"><Icon type="bar-chart"/><span>Announcements</span></NavLink>
                            </Menu.Item>
                            <SubMenu
                                key="Profile"
                                title={
                                    <>
                                        <Icon type="user"/>
                                        <span>
                                    Profile
                                </span>
                                    </>
                                }
                            >
                                <Menu.Item key="/student/profile/edit">
                                    <NavLink to="/student/profile/edit">Edit Profile</NavLink>
                                </Menu.Item>
                                <Menu.Item key="/student/profile/add_experience">
                                    <NavLink to="/student/profile/add_experience">Add Experience</NavLink>
                                </Menu.Item>
                                <Menu.Item key="/student/profile/add_project">
                                    <NavLink to="/student/profile/add_project">Add Project</NavLink>
                                </Menu.Item>
                            </SubMenu>
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
                                <Menu.Item key="/student/jobs/application">
                                    <NavLink to="/student/jobs/application">Current Openings</NavLink>
                                </Menu.Item>
                                <Menu.Item key="/student/jobs/manage">
                                    <NavLink to="/student/jobs/manage">Manage Applications</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="Contact"
                                title={
                                    <>
                                        <Icon type="contacts"/>
                                        <span>
                                    Contact Placement Cell
                                </span>
                                    </>
                                }
                            >
                                <Menu.Item key="/student/profile/query">
                                    <NavLink to="/student/profile/query">Create Query</NavLink>
                                </Menu.Item>
                                <Menu.Item key="/student/profile/contact_us">
                                    <NavLink to="/student/profile/contact_us">Contact Details</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item>
                                <NavLink to="/student/profile/report_bug"><Icon type="bug" /><span>Report Bugs</span></NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Drawer>
                :
                <Sider
                    trigger={null}
                    width={250}
                    collapsible
                    collapsed={collapsed}
                    style={{height: '100vh', position: 'fixed' }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKey}
                        style={{
                            height: '100%'
                        }}
                    >
                        <Menu.Item key='/student/dashboard'>
                            <NavLink to="/student/dashboard"><Icon type="dashboard"/><span>Dashboard</span></NavLink>
                        </Menu.Item>
                        <Menu.Item key='/student/profile/announcements'>
                            <NavLink to="/student/profile/announcements"><Icon type="bar-chart"/><span>Announcements</span></NavLink>
                        </Menu.Item>
                        <SubMenu
                            key="Profile"
                            title={
                                <>
                                <Icon type="user"/>
                                <span>
                                    Profile
                                </span>
                                </>
                            }
                        >
                            <Menu.Item key="/student/profile/edit">
                                <NavLink to="/student/profile/edit">Edit Profile</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/student/profile/add_experience">
                                <NavLink to="/student/profile/add_experience">Add Experience</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/student/profile/add_project">
                                <NavLink to="/student/profile/add_project">Add Project</NavLink>
                            </Menu.Item>
                        </SubMenu>
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
                            <Menu.Item key="/student/jobs/application">
                                <NavLink to="/student/jobs/application">Current Openings</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/student/jobs/manage">
                                <NavLink to="/student/jobs/manage">Manage Applications</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="Contact"
                            title={
                                <>
                                <Icon type="contacts"/>
                                <span>
                                    Contact Placement Cell
                                </span>
                                </>
                            }
                        >
                            <Menu.Item key="/student/profile/query">
                                <NavLink to="/student/profile/query">Create Query</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/student/profile/contact_us">
                                <NavLink to="/student/profile/contact_us">Contact Details</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item>
                            <NavLink to="/student/profile/report_bug"><Icon type="bug" /><span>Report Bugs</span></NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            }
            </>

        );
    }
}

export default withRouter(Sidebar);
