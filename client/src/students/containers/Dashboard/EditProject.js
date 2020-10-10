import React, {Component} from 'react';
import {Layout} from 'antd'
import {withRouter} from 'react-router-dom';

import EditProjectForm from '../../components/Dashboard/EditProject';

const {Content} = Layout;

class EditProject extends Component {
    state = {
        project_id: this.props.project_id,
        project_data: {
            project_name: this.props.project_name,
            guidance: this.props.guidance,
            project_location: this.props.project_location,
            description: this.props.description,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
            active: this.props.active
        }
    };

    render() {
        const { project_data, project_id} = this.state;
        const {loading, isMobile, handleEditProject, editProjectVisible, onEditProjectClose} = this.props;
        const editProjectProps = {
            ...project_data,
            project_id,
            loading,
            isMobile,
            handleEditProject,
            editProjectVisible,
            onEditProjectClose
        };
        return (
            <Layout>
                <Content
                    style={{backgroundColor: '#fff'}}
                    >
                    <EditProjectForm {...editProjectProps}/>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(EditProject);
