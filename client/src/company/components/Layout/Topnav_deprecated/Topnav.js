import React, { Component } from "react";
import { Layout, Menu} from "antd";
import {withRouter} from 'react-router-dom'

import store from '../../../../redux/store';
import {authLogout} from "../../../../redux/actions";

const { Header } = Layout;

class Topnav extends Component {
    handleLogout = () => {
        store.dispatch(authLogout());
        this.props.history.push("/");
    }
    render() {
        return (
            <Header style={{background: '#fff'}}>
                <Menu
                    style={{
                        float: 'right',
                        lineHeight:'64px',
                    }}
                    mode='horizontal'
                    theme='light'
                >
                    <Menu.Item key='logout' style={{float: 'right'}} onClick={this.handleLogout}>
                        Logout
                    </Menu.Item>
                    <Menu.Item key='help' style={{float: 'right'}}>
                        Help
                    </Menu.Item>
                </Menu>
            </Header>

        );
    }
}

export default withRouter(Topnav);
