import React, {Component} from 'react';
import {Layout, Row, Spin, Typography} from "antd";
import CreateAnnouncementsForm from "../../components/Students/CreateAnnouncements";
import {connect} from "react-redux";
import * as actionCreators from '../../../redux/actions';
import {withRouter} from 'react-router-dom'

const {Content} = Layout;

class CreateAnnouncements extends Component {

    onSubmit = (values) => {
        this.props.onSubmit(values)
    };

    render() {

        const formProps = {
            onSubmit: this.onSubmit
        };

        return (
            <Layout>
                <Spin spinning={this.props.loading} tip="Creating Announcement...">
                    <Content
                        style={{
                            background: '#fff',
                            margin: 10,
                            padding: 10
                        }}
                    >
                        <Row type='flex' justify='center' style={{margin: 10}}>
                            <Typography.Title>
                                Create Announcements
                            </Typography.Title>
                        </Row>
                        <Row>
                            <CreateAnnouncementsForm {...formProps}/>
                        </Row>
                    </Content>
                </Spin>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.admin.ui.page_loading
    };

};

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (values) => dispatch(actionCreators.createAnnouncement(values))
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAnnouncements));