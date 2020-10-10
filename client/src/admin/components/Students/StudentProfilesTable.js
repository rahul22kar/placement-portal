import React, {Component} from 'react';
import {Table, Button, Icon, Row, Col, Layout, Input, Checkbox, Modal} from "antd";
import moment from 'moment';

import StudentProfileModal from './StudentProfileModal'
import * as commonConstants from '../../../utils/Constants'

const {Content} = Layout;
const {TextArea} = Input;

class StudentProfilesTable extends Component {
    state={
        selectedRowKeys: [],
        visible: false,
        index: 0,
        searchText: '',
        disableModalVisible: false,
        reason: '',
        id: '',
        email: ''
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
    });

    handleDetails = (id) => {
        let index = this.props.studentData.map(profile => profile._id).indexOf(id);
        this.setState({
            visible: true,
            index
        })
    };

    onClose = () => {
        this.setState({visible: false})
    };

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleDisable = () => {
        let id = this.state.id;
        let email = this.state.email;
        let reason = this.state.reason;
        this.props.disableStudentProfile(id, email, reason);
        this.setState({
            disableModalVisible: false,
            reason: ""
        })
    };

    handleReason = (e) => {
        this.setState({ reason: e.target.value });
    };

    handleCancel = () =>{
        this.setState({
            disableModalVisible: false,
            reason: ""
        })
    };

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const {
            visible,
            index
        } = this.state;

        const {
            studentData,
            loading,
            isMobile
        } = this.props;

        const columns = [
            {
                title: "Student Name",
                dataIndex: 'first_name',
                key: "name",
                align: 'center',
                width: 200,
                ...this.getColumnSearchProps('first_name'),
                render : (text, row) =>
                    text + " " + row.last_name
            },
            {
                title: "Roll number",
                dataIndex: 'roll_number',
                key: 'roll_number',
                align: 'center',
                ...this.getColumnSearchProps('roll_number')
            },
            {
                title: "CPI",
                dataIndex: 'cpi',
                key: 'cpi',
                align: 'center',
            },
            {
                title: "Year of study",
                dataIndex: 'year_of_study',
                key: 'year_of_study',
                filters: commonConstants.yearFilterObject,
                onFilter: (value, record) => record.year_of_study.indexOf(value) === 0,
                align: 'center',
                render: (text) =>
                    commonConstants.yearToTextMap[text]
            },
            {
                title: "Branch",
                dataIndex: 'branch',
                key: 'branch',
                align: 'center',
                filters: commonConstants.branchFilterObject,
                onFilter: (value, record) => record.branch.indexOf(value) === 0,
                render: (text) =>
                    commonConstants.branchToTextMap[text]
            },
            {
                title: "Course",
                dataIndex: 'course_type',
                key: 'course_type',
                align: 'center',
                render: (text) =>
                    commonConstants.courseToTextMap[text]
            },
            {
                title: "CV Approval",
                dataIndex: 'cv',
                key: 'cv',
                align: 'center',
                render: (cv, row) =>
                    <div>
                        <Row>
                            <Checkbox defaultChecked={cv[0].approved === 1} disabled><a href={cv[0].link} target={"_blank"}>CV1</a></Checkbox>
                        </Row>
                        {   typeof cv[1] !== 'undefined' ?
                            <Row>
                                <Checkbox defaultChecked={cv[1].approved === 1} disabled><a href={cv[1].link} target={"_blank"}>CV2</a></Checkbox>
                            </Row> : null
                        }
                        {
                            typeof cv[2] !== 'undefined' ?
                            <Row>
                                <Checkbox defaultChecked={cv[2].approved === 1} disabled><a href={cv[2].link} target={"_blank"}>CV3</a></Checkbox>
                            </Row> : null
                        }
                    </div>

            },
            {
                title: "Created At",
                dataIndex: 'created_date',
                key: 'created_date',
                align: 'center',
                render: (date) => moment(date, moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss A')
            },
            {
                title: 'Last Modified',
                dataIndex: 'last_modified_date',
                key: 'last_modified_date',
                align: 'center',
                render: (date) => moment(date, moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss A')
            },
            {
               title: 'Admin Approval',
               dataIndex: 'approval_status',
               align: 'center',
               render: status =>
               <Icon
                 {...(status === 1 ? {type: 'check-circle', theme: 'filled', style: {color: '#4bb543', fontSize: 20}} : (status === -1 ? {type: 'clock-circle', theme: 'filled', style: {color: '#1565C0', fontSize: 20}} : {type: 'close-circle', theme: 'filled', style: {color: '#f44336', fontSize: 20}} ))}
               />
            },
            {
                title: "Actions",
                dataIndex: '_id',
                key: 'id',
                align: 'center',
                width: 250,
                render: (id, row) =>
                    <Row type={'flex'} justify={'center'}>
                        <Col style={{margin: 10}}>
                            <Button type = 'primary' onClick = {() => this.handleDetails(id)}>Details</Button>
                        </Col>
                        {
                            row.active_status ?
                                <Col style={{margin: 10}}>
                                    <Button type = 'danger' onClick = {() => this.setState({id, disableModalVisible: true, email: row.email})}>Disable</Button>
                                </Col>
                                :
                                <Col style={{margin: 10}}>
                                    <Button type = 'danger' onClick = {() => this.props.enableStudentProfile(id ,row.email)}>Enable</Button>
                                </Col>
                        }

                    </Row>

            },
        ];

        const data = this.props.studentData;

        const tableProps = {
            columns,
            dataSource: data,
            loading,
            rowKey: '_id',
            scroll: {x: 1200},
            bordered: true,
            rowSelection
        };

        const modalProps={
            data: studentData[index],
            modalState: visible,
            onClose: this.onClose,
            commonConstants,
            isMobile
        };

        return (
            <>
                <Modal
                    title="Reason for disabling"
                    visible={this.state.disableModalVisible}
                    onOk={this.handleDisable}
                    onCancel={this.handleCancel}
                >
                    <Row type = 'flex' justify = 'center' align = 'middle'>
                        <Col span={24}>
                            <TextArea rows={5} onChange={this.handleReason} value={this.state.reason}/>
                        </Col>
                    </Row>
                </Modal>
                {visible ? <StudentProfileModal {...modalProps}/> : null}
                <Content
                style = {{
                  margin: "6px",
                  padding: 24,
                  background: '#fff',
                }}
                >
                    <Button disabled={this.state.selectedRowKeys.length === 0} type={'primary'} onClick={(() => this.props.downloadData(this.state.selectedRowKeys))} style={{margin: '15px 0px'}}>Download Data</Button>
                    <Table {...tableProps}/>
                </Content>
            </>
        );
    }
}

export default StudentProfilesTable;
