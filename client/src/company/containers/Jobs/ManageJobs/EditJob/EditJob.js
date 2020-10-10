import React, {Component} from 'react'
import {Col, Row, Steps, Layout, Spin, Typography, Drawer} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as actionCreators from '../../../../../redux/actions/index';

import {JobDetailsForm, SelectionDetailsForm, LogisticsDetailsForm, SalaryDetailsForm} from '../../../../components/Jobs'

const {Content} = Layout;

class EditJob extends Component{

    state = {
        current: 0,
        steps: [
            {
                title: 'Job Details'
            },
            {
                title: 'Selection Criteria'
            },
            {
                title: 'Salary Details'
            },
            {
                title: 'Logistics Details'
            }
        ],
        job_details: {
            job_headline: "",
            type_of_job: "",
            job_description: "",
            job_location: "",
            job_designation: "",
            number_of_openings: "",
            application_deadline: null
        },
        selection_criteria: {
            eligible_branches: null,
            type_of_interview: null,
            skills: null,
            test_type: null,
            minimum_cpi: null,
            special_requirements: "",
            resume_criteria: ""
        },
        salary_details: {
            base_salary: null,
            bonus_perks: "",
            contract_data: null,
            other_pay: "",
            ctc_effective: ""
        },
        logistics_details: {
            members_oncampus: null,
            days_oncampus: null,
            other_requirement: ""
        }
    };

    componentDidMount(){
        this.setState({
            job_details: {
                job_headline: this.props.profile.job_headline,
                type_of_job: this.props.profile.type_of_job,
                job_description: this.props.profile.job_description,
                job_location: this.props.profile.job_location,
                job_designation: this.props.profile.job_designation,
                number_of_openings: this.props.profile.number_of_openings,
                application_deadline: this.props.profile.application_deadline
            },
            selection_criteria: {
                eligible_branches: this.props.profile.eligible_branches,
                type_of_interview: this.props.profile.type_of_interview,
                skills: this.props.profile.skills,
                test_type: this.props.profile.test_type,
                minimum_cpi: this.props.profile.minimum_cpi,
                special_requirements: this.props.profile.special_requirements,
                resume_criteria: this.props.profile.resume_criteria
            },
            salary_details: {
                base_salary: this.props.profile.base_salary,
                bonus_perks: this.props.profile.bonus_perks,
                contract_data: this.props.profile.contract_data,
                other_pay: this.props.profile.other_pay,
                ctc_effective: this.props.profile.ctc_effective
            },
            logistics_details: {
                members_oncampus: this.props.profile.members_oncampus,
                days_oncampus: this.props.profile.days_oncampus,
                other_requirement: this.props.profile.other_requirement
            }
        })

    }

    handleJobDetails = (values) => {
        const { job_details } = this.state;
        this.setState({ job_details: {
            ...job_details,
            ...values
        }})
    };

    handleSelectionCriteria = (values) => {
        const { selection_criteria } = this.state;
        this.setState({ selection_criteria: {
            ...selection_criteria,
            ...values
        }})
    };

    handleSalaryDetails = (values) => {
        const { salary_details } = this.state;
        this.setState({ salary_details: {
            ...salary_details,
            ...values
        }})
    };

    handleLogisticsDetails = (values) => {
        const { logistics_details } = this.state;
        this.setState({ logistics_details: {
            ...logistics_details,
            ...values
        }})
    };

    handleBack = () => {
        this.setState({current: this.state.current - 1})
    };

    handleNext = () => {
        this.setState({current: this.state.current + 1})
    };

    handleSubmit = (values) => {
        const { logistics_details } = this.state;
        this.setState({
            logistics_details: {
                ...logistics_details,
                ...values
            }
        }, () => {
            const { job_details, selection_criteria, salary_details, logistics_details } = this.state
            const inputData = {
                ...job_details,
                ...selection_criteria,
                ...salary_details,
                ...logistics_details,
                job_id: this.props.profile._id
            };
            if (inputData.contract_data) {
                const contractData = new FormData();
                contractData.append('contract', salary_details.contract_data[0].originFileObj);
                this.props.onEditJob(contractData, inputData)
            } else {
                const contractData = null;
                this.props.onEditJob(contractData, inputData)
            }
        })
    };

    render(){
        const {
            loading,
            onClose,
            editVisible,
            isMobile
        } = this.props;
        const {
            current,
            steps,
            job_details,
            selection_criteria,
            salary_details,
            logistics_details
        } = this.state;

        const {
            handleBack,
            handleNext,
            handleSubmit,
            handleJobDetails,
            handleSalaryDetails,
            handleLogisticsDetails,
            handleSelectionCriteria
        } = this;

        const jobDetailsProps = {
            ...job_details,
            handleNext,
            submitValues: handleJobDetails
        };

        const selectionDetailsProps = {
            ...selection_criteria,
            handleNext,
            handleBack,
            submitValues: handleSelectionCriteria
        };

        const salaryDetailsProps = {
            ...salary_details,
            handleNext,
            handleBack,
            submitValues: handleSalaryDetails
        };

        const logistictsDetailsProps = {
            ...logistics_details,
            handleBack,
            handleSubmit,
            submitValues: handleLogisticsDetails
        };

        return(
            <Drawer
                width={isMobile ? '100vw' : '40vw'}
                placement="right"
                onClose={onClose}
                visible={editVisible}
                >
                <Spin spinning={loading} tip="Loading...">
                    <Layout>
                        <Row type='flex' justify='center'>
                            <Col span={24}>
                                <Content
                                    style={{
                                        background: "#fff"
                                    }}
                                    >
                                    <Row type='flex' justify='center' style={{background: '#fff'}}>
                                        <Row type= 'flex' justify='center'>
                                            <Typography.Title>
                                                Edit Job
                                            </Typography.Title>
                                        </Row>
                                        <Steps current={current} style={{margin: 24}}>
                                            {steps.map(item => (
                                                <Steps.Step key={item.title} title={item.title}/>
                                            ))}
                                        </Steps>
                                        <Row type='flex' justify='center' style={{background: '#fff',margin: 24}}>
                                            {current === 0 ?
                                                <Col>
                                                    <JobDetailsForm {...jobDetailsProps}/>
                                                </Col>
                                            : null}
                                            {current === 1 ?
                                                <Col>
                                                    <SelectionDetailsForm {...selectionDetailsProps} />
                                                </Col>
                                            : null}
                                            {current === 2 ?
                                                <Col>
                                                    <SalaryDetailsForm {...salaryDetailsProps} />
                                                </Col>
                                            : null}
                                            {current === 3 ?
                                                <Col>
                                                    <LogisticsDetailsForm {...logistictsDetailsProps}/>
                                                </Col>
                                            : null}
                                        </Row>
                                    </Row>
                                </Content>
                            </Col>
                        </Row>
                    </Layout>
                </Spin>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => ({
    jobID: state.job.id,
    jobProfile: state.job.profile
});

const mapDispatchToProps = dispatch => {
    return {
        onEditJob: (contractData, inputData) => dispatch(actionCreators.editJob(contractData, inputData))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditJob));
