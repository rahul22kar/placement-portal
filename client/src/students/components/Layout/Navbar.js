import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';

const {Header} = Layout;
const {SubMenu} = Menu;

class Navbar extends Component {

    handleLogoutAction = () => {
        this.props.onLogout();
        this.props.history.push("/");
    };

    render() {
        const {onCollapse, collapsed} = this.props;
        const menu = (
            <Menu
                theme='light'
                mode="horizontal"
                style={{
                    lineHeight: '64px',
                    width: '100%'
                }}
                selectable={false}
            >
                <Menu.Item key="trigger" onClick={onCollapse} style={{float: 'left'}}>
                    <Icon type={collapsed ? "menu-unfold" : "menu-fold"} style={{fontSize: '1.1rem'}}/>
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.handleLogoutAction}
                           style={{float: 'right', fontSize: '0.9rem'}}><Icon type="logout"
                                                                              style={{fontSize: '1.1rem'}}/>Logout</Menu.Item>
                <SubMenu
                    key="help"
                    style={{float: 'right', fontSize: '0.9rem'}}
                    title={
                        <>
                            <Icon type="question-circle"
                                  style={{fontSize: '1.1rem'}}/>
                            <span>
                              Help
                            </span>
                        </>
                    }
                >
                    <Menu.Item key="student_policies">
                        <a href={"https://www.iitgoa.ac.in/placement/files/Student_Policies_IIT_Goa.pdf"} target={"_blank"}>Student Policies</a>
                    </Menu.Item>
                    <Menu.Item key={"contact_us"}>
                        <NavLink to={"/student/profile/contact_us"}>Contact Us</NavLink>
                    </Menu.Item>
                    <Menu.Item key={"reset_password"}>
                        <NavLink to={"/student/profile/reset_password"}>Reset Password</NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
        return (
            <Header style={{width: '100%', background: '#fff', padding: 0, marginBottom: '5px' , boxShadow: "0px 2px 5px 0px rgba(184,184,184,1)"}}>
                {menu}
            </Header>
        );
    }
}

export default withRouter(Navbar);
