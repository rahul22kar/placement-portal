import React, { Component } from 'react'
import { Layout, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actionCreators from '../../../../redux/actions';

import {ListStudent} from '../../../components/Jobs'

const {Content} = Layout;

class ListStudentsModal extends Component{

    componentDidMount(){
        this.props.getStudentProfiles()
    }

    render(){

        const {modalVisible, handleOk, handleCancel, studentProfiles, loading} = this.props;

        const modalProps = {
            centered: true,
            title: "Shortlist Students",
            visible: modalVisible,
            onOk: handleOk,
            onCancel: handleCancel,
            width: "80vw"
        };

        const listStudentProps = {
            studentProfiles,
            loading,
        };

        return(
            <Modal {...modalProps}>
                <Layout>
                    <Content
                        style={{
                            background: '#fff',
                        }}>
                        <ListStudent {...listStudentProps}/>
                    </Content>
                </Layout>
            </Modal>

        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStudentsModal));
