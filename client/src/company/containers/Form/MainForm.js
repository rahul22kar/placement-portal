import React, {Component} from 'react';
import {withRouter, NavLink, Redirect} from 'react-router-dom';
import {Layout, Row, Col, Result, Button, Descriptions, Spin, Typography,Form, Input, InputNumber, message,Select,Card } from 'antd';

const { Option } = Select;

const {Content} = Layout;

class MainForm extends React.Component{

    state = {
        form_name : "",
        description : ""
    }
    componentDidMount = () => {
        if(this.props.location.state === undefined)
            return window.location = '/company/pre_form'
        this.setState({form_name : this.props.location.state.form_name});
        this.setState({description : this.props.location.state.description});
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        let profileMessage = null;

            profileMessage = (
                <Content
                    style={{
                        margin: 10,
                        padding: 24,
                        background: "#fff"
                    }}
                >
                    <Card title= {this.state.form_name}
                    >

                        <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                        Inner Card content
                        </Card>
                        <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="Inner Card title"
                        extra={<a href="#">More</a>}
                        >
                        Inner Card content
                        </Card>
                    </Card>
                </Content>
            );
        return (
            <Layout>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        {profileMessage}
                    </Col>
                </Row>
            </Layout>
        );
    }
    
}
const Main = Form.create({ name: 'createform' })(MainForm);

export default withRouter(Main);
