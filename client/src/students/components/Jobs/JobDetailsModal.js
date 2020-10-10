import React, {Component} from 'react';
import {Row, Col, Modal, Button, Descriptions, Tag, Radio} from "antd";
import * as commonConstants from "../../../utils/Constants";
import {NavLink, withRouter} from "react-router-dom";

class JobDetailsModal extends Component {

    render() {

        const {modalVisible, handleOk, handleCancel, jobId, filteredJobs} = this.props;

        const jobDetails = filteredJobs.find(job => job._id === jobId);
        const modalProps = {
            centered: true,
            title: "Job Profile",
            visible: modalVisible,
            onOk: handleOk,
            onCancel: handleCancel,
            width: "50vw"
        };

        return (
            <Modal {...modalProps}>
                <Row>
                    <Descriptions
                        column={1}
                    >
                        <Descriptions.Item label={"Company name"}>
                            {jobDetails.company_name}
                        </Descriptions.Item>
                        <Descriptions.Item label={"Job headline"}>
                            {jobDetails.job_headline}
                        </Descriptions.Item>
                        <Descriptions.Item label={"Job type"}>
                            {jobDetails.type_of_job}
                        </Descriptions.Item>
                        <Descriptions.Item label={"Location"}>
                            {jobDetails.job_location}
                        </Descriptions.Item>
                        <Descriptions.Item label="Skills required">
                            {
                                jobDetails.skills ? jobDetails["skills"].map(item =>
                                    <Tag key={item} color='blue' style={{margin: 5}}>{item}</Tag>
                                ) : null
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label={"Base Salary"}>
                            {jobDetails.base_salary}
                        </Descriptions.Item>
                        <Descriptions.Item label={"Job description"}>
                            {jobDetails.job_description}
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Modal>
        );
    }
}

export default withRouter(JobDetailsModal);