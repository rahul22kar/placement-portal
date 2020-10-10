import React, {Component} from 'react';
import AnnouncementsCards from "../../components/Profile/Announcements";
import {connect} from "react-redux";
import {Spin, Layout, Row, Typography, Col} from 'antd'
import {withRouter} from 'react-router-dom'
import * as actionCreators from '../../../redux/actions'

const {Content} = Layout;

class Announcements extends Component {

    state = {
        announcements: []
    };

    componentDidMount() {
        if (this.props.profileData.branch){
            const params = {
                branch: this.props.profileData.branch,
                course_type: this.props.profileData.course_type,
                year_of_study: this.props.profileData.year_of_study
            };
            this.props.onFetchAnnouncements(params);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.profileData !== this.props.profileData) {
            const params = {
                branch: this.props.profileData.branch,
                course_type: this.props.profileData.course_type,
                year_of_study: this.props.profileData.year_of_study
            };
            this.props.onFetchAnnouncements(params);
        }
        if(prevProps.announcements !== this.props.announcements) {
            this.setState({announcements: this.props.announcements});
        }
    }

    render() {
        const announcementsProps = {
            announcements: this.state.announcements
        };
        return (
            <Spin spinning={this.props.loading} tip="Loading ...">
                <Layout>
                    <Content
                        style={{
                            margin: 10,
                            padding: 10,
                            background: '#fff'
                        }}
                    >
                        <Row type={'flex'} justify={'center'} style={{maring: 10}}>
                            <Typography.Title>
                                Announcements
                            </Typography.Title>
                        </Row>
                        <Row type={'flex'} justify={'center'}>
                            <Col span={22}>
                                <AnnouncementsCards {...announcementsProps}/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Spin>

    );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading.tabs,
        announcements: state.profile.announcements,
        profileData: state.profile.profileData
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchAnnouncements: (values) => dispatch(actionCreators.fetchAnnouncements(values))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Announcements));