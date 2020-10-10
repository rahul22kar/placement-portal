import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Result, Layout} from 'antd';

class ConnectionFailed extends Component {
    render() {
        const { Content } = Layout;
        return (
            <Content
                style={{
                    margin: "6px",
                    padding: 24,
                    background: "#fff",
                    height: '80vh'
                }}
            >
            <Result title="Connection Error" status="error" extra={<span>Kindly check your internet connection and reload.</span>} />
            </Content>
        );
    }
}

export default withRouter(ConnectionFailed);