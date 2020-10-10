import React, {Component} from 'react';
import {Row, Col, Modal, Button, Descriptions, Tag, Radio} from "antd";
import * as commonConstants from "../../../utils/Constants";
import {NavLink, withRouter} from "react-router-dom";

class ApplicationModal extends Component {

    state = {
        cv: 0
    };

    selectCV = (e) => {
        this.setState({cv: e.target.value})
    };

    render() {

        const {profileData, modalVisible, handleOk, handleCancel, jobId, filteredJobs} = this.props;

        const jobDetails = filteredJobs.find(job => job._id === jobId);
        console.log(jobDetails, jobId);
        const modalProps = {
            okText: "Apply Now",
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
                        {/*<Descriptions.Item label="Name">{profileData.first_name + " " + profileData.last_name}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Branch">{commonConstants.branchToTextMap[profileData.branch]}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Email">{profileData.email}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="CPI">{profileData.cpi}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Year of Study">{commonConstants.yearToTextMap[profileData.year_of_study]}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Phone Number">{profileData.phone_a}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Skills">*/}
                        {/*    {*/}
                        {/*        profileData.interests ? profileData["skills"].map(item =>*/}
                        {/*            <Tag key={item} color='blue' style={{margin: 5}}>{item}</Tag>*/}
                        {/*        ) : null*/}
                        {/*    }*/}
                        {/*</Descriptions.Item>*/}
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
                        <Descriptions.Item label={"Select CV to Apply"} span={4}>
                            <Radio.Group onChange={this.selectCV} value={this.state.cv} defaultValue={0}>
                                {
                                    profileData.cv[0].approved === 1 ?
                                        <Row>
                                            <Radio value={0}><a href={profileData.cv[0].link} target={'_blank'}>CV0</a></Radio>
                                        </Row> : null
                                }
                                {
                                    profileData.cv[1] && profileData.cv[1].approved === 1 ?
                                        <Row>
                                            <Radio value={1}><a href={profileData.cv[1].link} target={'_blank'}>CV1</a></Radio>
                                        </Row> : null
                                }
                                {
                                    profileData.cv[2] && profileData.cv[2].approved === 1 ?
                                        <Row>
                                            <Radio value={2}><a href={profileData.cv[2].link} target={'_blank'}>CV2</a></Radio>
                                        </Row> : null
                                }
                            </Radio.Group>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Modal>
        );
    }
}

export default withRouter(ApplicationModal);