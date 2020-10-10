import React, { Component } from 'react';
import { Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actionCreators from '../../../redux/actions/index';

import StudentProfile from '../../components/StudentProfile';

const {Content} = Layout;

class StudentProfiles extends Component{

    componentDidMount(){
        this.props.getStudentProfiles()
    };

    render(){

        const {studentProfiles, loading, isMobile} = this.props;

        const studentProfileProps = {
            studentProfiles,
            loading,
            isMobile
        };

        return(
            <Layout>
                <Content
                    style={{
                        background: '#fff',
                        margin: 10,
                    }}>
                    <StudentProfile {...studentProfileProps} />
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.job.loading,
    studentProfiles: state.job.studentProfiles
});

const mapDispatchToProps = dispatch => {
    return{
        getStudentProfiles: () => {dispatch(actionCreators.getStudentProfiles())}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentProfiles));
