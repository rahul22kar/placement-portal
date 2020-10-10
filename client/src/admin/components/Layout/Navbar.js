import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Layout, Menu, Icon, Typography, Input, Avatar, Badge} from 'antd';
import {SearchOutlined, BellOutlined} from '@ant-design/icons';

const {Header} = Layout;

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
                    lineHeight:'64px',
                    width: '100%'
                }}
                selectable={false}
            >
                <Menu.Item key={"Header"}>
                    <Typography.Text style={{fontSize: '1.2rem', float: 'left'}}>IIT Goa</Typography.Text>
                </Menu.Item>
                {/*<Menu.Item key="trigger" onClick={onCollapse} style={{float: 'left'}}>*/}
                {/*    <Icon type={collapsed? "menu-unfold" : "menu-fold"} style={{fontSize: '1.2rem'}}/>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="logout" onClick={this.handleLogoutAction} style={{float: 'right'}}>
                    <Avatar size={35} style={{background: "#212121"}}>
                        A
                    </Avatar>
                </Menu.Item>
                <Menu.Item key={"notification"} style={{float: 'right'}}>
                    <Badge count={21}>
                        <BellOutlined style={{fontSize: '1.2rem'}}/>
                    </Badge>
                </Menu.Item>
                <Menu.Item key={"searchBar"} style={{float: 'right'}}>
                    <Input.Search
                        placeholder={"Search students"}
                    />
                </Menu.Item>
            </Menu>
        );
        return (
            <Header style={{background: '#fff', padding: '0 12px'}}>
                {menu}
            </Header>
        );
    }
}

export default withRouter(Navbar);
