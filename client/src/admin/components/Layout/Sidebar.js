import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Layout, Menu, Icon, Drawer, Row, Typography} from 'antd';
import Logo from '../../../assets/images/White_Logo.png'

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
                                height: '100%',
                                minHeight: '100vh',
                                padding: '24px 0'
                            }}>
                            <Sider
                                width={250}
                                style={{minHeight: '100vh', height: '100%'}}>
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    selectedKeys={selectedKey}
                                >
                                    <Menu.Item key='/admin/dashboard'>
                                        <NavLink to="/admin/dashboard"><Icon type="dashboard"/><span>Dashboard</span></NavLink>
                                    </Menu.Item>
                                    <SubMenu
                                        key="Student"
                                        title={
                                            <>
                                                <Icon type="user"/>
                                                <span>
                                            Manage Students
                                        </span>
                                            </>
                                        }
                                    >
                                        <Menu.Item key="/admin/student/student_profiles">
                                            <NavLink to="/admin/student/student_profiles">Profiles</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="/admin/student/review_student_profiles">
                                            <NavLink to="/admin/student/review_student_profiles">Review Profiles</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="/admin/student/create_announcements">
                                            <NavLink to="/admin/student/create_announcements">Create Announcements</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="/admin/student/configure_portal">
                                            <NavLink to="/admin/student/configure_portal">Configure Portal</NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="Company"
                                        title={
                                            <>
                                                <Icon type="user"/>
                                                <span>
                                            Manage Companies
                                        </span>
                                            </>
                                        }
                                    >
                                        <Menu.Item key="/admin/company/profile">
                                            <NavLink to="/admin/company/profile">Profiles</NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="/admin/company/create">
                                            <NavLink to="/admin/company/create">Create Login</NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                        </Drawer>
                        :
                        <Sider
                            trigger={null}
                            width={250}
                            style={{height: '100vh', position: 'fixed' }}
                        >
                            <Row type={'flex'} justify={'center'}>
                                <img src={Logo} alt={"IIT Goa Logo"} width={100} style={{margin: 15}}/>
                            </Row>
                            <Menu
                                theme="dark"
                                mode="inline"
                                selectedKeys={selectedKey}
                                style={{
                                    height: '100%'
                                }}
                            >
                                <Menu.Item key='/admin/dashboard'>
                                    <NavLink to="/admin/dashboard"><Icon type="dashboard"/><span>Dashboard</span></NavLink>
                                </Menu.Item>
                                <SubMenu
                                    key="Student"
                                    title={
                                        <>
                                            <Icon type="user"/>
                                            <span>
                                        Manage Students
                                    </span>
                                        </>
                                    }
                                >
                                    <Menu.Item key="/admin/student/student_profiles">
                                        <NavLink to="/admin/student/student_profiles">Profiles</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/admin/student/review_student_profiles">
                                        <NavLink to="/admin/student/review_student_profiles">Review Profiles</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/admin/student/create_announcements">
                                        <NavLink to="/admin/student/create_announcements">Create Announcements</NavLink>
                                    </Menu.Item>

                                    {/*In dev*/
                                        /*<Menu.Item key="/admin/student/configure_portal">
                                            <NavLink to="/admin/student/configure_portal">Configure Portal</NavLink>
                                        </Menu.Item>*/
                                    }
                                </SubMenu>
                                <SubMenu
                                    key="Company"
                                    title={
                                        <>
                                            <Icon type="user"/>
                                            <span>
                                        Manage Companies
                                    </span>
                                        </>
                                    }
                                >
                                    <Menu.Item key="/admin/company/profile">
                                        <NavLink to="/admin/company/profile">Profiles</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/admin/company/create">
                                        <NavLink to="/admin/company/create">Create Login</NavLink>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                }
            </>

        );
    }
}

export default withRouter(Sidebar);
