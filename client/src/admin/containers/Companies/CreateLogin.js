import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Layout, Row, Typography} from 'antd'
import {withRouter} from 'react-router-dom'
import CreateLoginForm from '../../components/Companies/CreateLoginForm'

import * as actionCreators from "../../../redux/actions";

const {Content} = Layout;

class CreateLogin extends Component{

    handleSubmit = (values) =>{
        this.props.onSubmit(values);
    };

    render(){

        const {
            isMobile
        } = this.props;

        const formProps = {
            onSubmit: this.handleSubmit,
            isMobile
        };

        return(
            <Row type='flex' justify='start'>
                <Layout>
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10,
                            padding: 24
                        }}
                        >
                        <Row type='flex' justify='center' style={{padding: 20}}>
                            <Typography.Title>
                                Create Login
                            </Typography.Title>
                        </Row>
                        <Row>
                            <CreateLoginForm {...formProps}/>
                        </Row>
                    </Content>
                </Layout>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.admin.page_loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (values) => dispatch(actionCreators.createLogin(values))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateLogin))
