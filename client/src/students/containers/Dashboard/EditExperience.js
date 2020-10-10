import React, {Component} from 'react';
import {Layout} from 'antd'
import {withRouter} from 'react-router-dom';
import EditExperienceForm from '../../components/Dashboard/EditExperience';

const {Content} = Layout;

class EditExperience extends Component {
    state = {
        experience_id: this.props.experience_id,
        experience_data: {
            company_name: this.props.company_name,
            experience_location: this.props.experience_location,
            experience_type: this.props.title,
            description: this.props.description,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
            active: this.props.active
        }
    };

    render() {
        const { experience_data, experience_id} = this.state;
        const {loading, isMobile, handleEditExperience, editExperienceVisible, onEditExperienceClose} = this.props;
        const editExperienceProps = {
            ...experience_data,
            experience_id,
            loading,
            isMobile,
            handleEditExperience,
            editExperienceVisible,
            onEditExperienceClose
        };
        return (
            <Layout>
                <Content
                    style={{backgroundColor: '#fff'}}
                    >
                    <EditExperienceForm {...editExperienceProps}/>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(EditExperience);
