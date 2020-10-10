import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Layout, Row, Col, Typography} from "antd";
import JobApplicationsTable from "../../components/Jobs/JobApplicationsTable";
import * as actionCreators from "../../../redux/actions";

const {Content} = Layout;

class JobApplications extends Component {

    componentDidMount() {
        this.props.findJobs();
    }

    render() {

        const {loading, jobs, profileData} = this.props;

        const tableProps = {
            jobs,
            loading,
            profileData
        };

        return (
            <div>
                <Layout>
                    <Content
                        style = {{
                            margin: "6px",
                            padding: 24,
                            background: '#fff',
                        }}
                    >
                        <Row type={'flex'} justify={'center'}>
                            <Col
                                style={{margin: 12}}
                            >
                                <Typography.Title>Current Openings</Typography.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <JobApplicationsTable {...tableProps}/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.profile.loading.profile,
    jobs: state.profile.jobs,
    profileData: state.profile.profileData
});

const mapDispatchToProps = dispatch => {
    return {
        findJobs: () => dispatch(actionCreators.findJobs())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobApplications));