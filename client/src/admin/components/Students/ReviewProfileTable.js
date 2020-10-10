import React, {Component} from 'react';
import {Table, Button, Icon, Row, Col, Layout, Select, Input, Modal, Checkbox} from "antd";

import StudentProfileModal from './StudentProfileModal'
import * as commonConstants from '../../../utils/Constants'
import moment from "moment";

const {Content} = Layout;
const {Option} = Select;
const {TextArea} = Input;

class ReviewProfileTable extends Component {
    state={
        visible: false,
        visible_modal: false,
        id: '',
        index: 0,
        searchText: '',
        suggested_changes: '',
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

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    approveProfile = (id, email) => {
        this.props.approveProfile(id, email)
    };

    disapproveProfile = (id, email) => {
        this.setState({
         visible_modal: true,
         id,
        email
        })
    };

    handleDisapprove = () => {
        let id = this.state.id;
        let changes = this.state.suggested_changes;
        let email = this.state.email;
        this.props.disapproveProfile(id, email, changes);
        this.setState({
            visible_modal: false,
            suggested_changes: ""
        })
    };

    handleSuggested = (e) => {
        this.setState({ suggested_changes: e.target.value });
    };

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

    handleChange = value => {
        this.setState({
            searchValue: value
        })
    };

    handleCancel = () =>{
        this.setState({
            visible_modal: false,
            suggested_changes: ""
        })
    };

    onChange = (e, cv_id, student_id) => {
        if (e.target.checked) {
            this.props.approveStudentCv(student_id, cv_id);
        } else {
            this.props.disapproveStudentCv(student_id, cv_id);
        }
    };

    render() {

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
                title: 'Action',
                dataIndex: '_id',
                key: 'action',
                width: 160,
                align: 'center',
                render: (id, row) =>
                <Row type = 'flex' align = 'middle' justify = 'center'>
                  <Col style = {{margin: "0 10px"}}>
                    <Button type = 'primary' onClick = {() => this.approveProfile(id, row.email)} size = "large" shape = "circle" icon = "check-circle"></Button>
                  </Col>
                  <Col style = {{margin: "0 10px"}}>
                    <Button type = 'danger ' onClick = {() => this.disapproveProfile(id, row.email)} size = "large" shape = "circle" icon = "close-circle"></Button>
                  </Col>
                </Row>
            },
            {
                title: "Student Name",
                dataIndex: 'first_name',
                key: "name",
                align: 'center',
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
                title: "CV Approval",
                dataIndex: 'cv',
                key: 'cv',
                align: 'center',
                render: (cv, row) =>
                    <div>
                        <Row>
                            <Checkbox defaultChecked={cv[0].approved === 1} onChange={(e) => this.onChange(e, cv[0]._id, row._id)} ><a href={cv[0].link} target={'_blank'}>CV1</a></Checkbox>
                        </Row>
                        {   typeof cv[1] !== 'undefined' ?
                            <Row>
                                <Checkbox defaultChecked={cv[1].approved === 1} onChange={(e) => this.onChange(e, cv[1]._id, row._id)} ><a href={cv[1].link} target={'_blank'}>CV2</a></Checkbox>
                            </Row> : null
                        }
                        {
                            typeof cv[2] !== 'undefined' ?
                            <Row>
                                <Checkbox defaultChecked={cv[2].approved === 1} onChange={(e) => this.onChange(e, cv[2]._id, row._id)} ><a href={cv[2].link} target={'_blank'}>CV3</a></Checkbox>
                            </Row> : null
                        }
                    </div>

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
                title: "More details",
                dataIndex: '_id',
                key: 'id',
                align: 'center',
                width: 150,
                render: (id) =>
                    <Button
                        type = 'primary '
                        onClick = {() => this.handleDetails(id)}
                        size = "large"
                        shape = "circle"
                        icon = "info-circle"
                        />
            },
        ];

        const data = studentData;

        const tableProps = {
            columns,
            dataSource: data,
            loading,
            rowKey: '_id',
            scroll: {x: 1200},
            bordered: true
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
              title="Suggested Changes"
              visible={this.state.visible_modal}
              onOk={this.handleDisapprove}
              onCancel={this.handleCancel}
              >
              <Row type = 'flex' justify = 'center' align = 'middle'>
                <Col span={24}>
                  <TextArea rows={5} onChange={this.handleSuggested} value={this.state.suggested_changes}/>
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
                    <Row type = 'flex' align = 'middle' justify = 'start' style={{margin: 10}}>
                        <Col style={{padding: 10}}>
                            <Select defaultValue = 'Name' style = {{width: 150}} onChange = {this.handleChange}>
                                <Option value = 'Name'>Name</Option>
                                <Option value = 'Roll Number'>Roll Number</Option>
                                <Option value = 'Email'>Email</Option>
                            </Select>
                        </Col>
                        <Col style = {{padding: 10}}>
                            <Input
                                type = 'text'
                                {...(this.state.isReset ? {value: ''} : null)}
                                placeholder = {`Search by ${this.state.searchValue}`}
                                onBlur = {e => {
                                    this.setState({searchText: e.target.value})
                                }}
                                onFocus = {e => {
                                    this.setState({isReset: false})
                                }}
                                />
                        </Col>
                        <Col style = {{padding: 10}}>
                            <Button type = 'primary' onClick = {this.handleSearch}>Search</Button>
                        </Col>
                        <Col style = {{padding: 10}}>
                            <Button type = 'secondary' onClick = {this.handleReset}>Reset</Button>
                        </Col>
                    </Row>
                    <Table {...tableProps}/>
                </Content>
            </>
        );
    }
}

export default ReviewProfileTable;
