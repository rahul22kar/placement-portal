import React, {Component} from 'react';
import {Button, Col, Icon, Input, Row, Select, Layout} from "antd";
import Table from "antd/es/table";
import CompanyProfileModal from './CompanyProfileModal';

const {Content} = Layout;
const {Option} = Select;


class CompanyProfilesTable extends Component {

    state={
        visible: false,
        index: 0,
        searchText: '',
        searchValue: 'Name',
        filteredData: [],
        isFilter: false,
        isReset: false
    };
    handleDetails = (id) => {
        let index = this.props.profiles.map(profile => profile._id).indexOf(id);
        this.setState({
            visible: true,
            index
        })
    };

    onClose = () => {
        this.setState({visible: false})
    };

    handleSearch = () => {
        const pattern = new RegExp(this.state.searchText);
        const filteredData = this.props.profiles.filter((profile) => {
            if (this.state.searchValue === 'Name') {
                if (pattern.test(profile.name)){
                    return profile
                }
            }
            if (this.state.searchValue === 'Roll Number') {
                if (pattern.test(profile.roll_number)){
                    return profile
                }
            }
            if (this.state.searchValue === 'Email') {
                if (pattern.test(profile.email)){
                    return profile
                }
            }
            return profile;
        });

        this.setState({
            filteredData,
            isFilter: true
        })
    };

    handleChange = value => {
        this.setState({
            searchValue: value
        })
    };

    handleReset = () => {
        this.setState({
            filterData: [],
            isFilter: false,
            isReset: true
        })
    };

    render() {

        const {
            visible,
            index
        } = this.state;

        const {
            isMobile,
            profiles,
            loading
        } = this.props;

        const columns = [
            {
                title: "Company Name",
                dataIndex: 'company_name',
                key: "name",
                align: 'center',
                width: 200
            },
            {
                title: "Type",
                dataIndex: 'type_of_company',
                key: "type",
                align: 'center',
            },
            {
                title: "Location",
                dataIndex: 'company_address',
                key: "location",
                align: 'center',
            },
            {
                title: "Website",
                dataIndex: 'website',
                key: "website",
                align: 'center',
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

        const data = this.state.isFilter ? this.state.filteredData : this.props.profiles;

        const tableProps = {
            columns,
            dataSource: data,
            loading,
            rowKey: '_id',
            scroll: {x: 900},
            bordered: true
        };

        const modalProps = {
            data: profiles[index],
            modalState: visible,
            onClose: this.onClose,
            isMobile
        };


        return (
            <>
                {visible ? <CompanyProfileModal {...modalProps}/> : null}
                <Content>
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
                    <Table {...tableProps} />
                </Content>
            </>
        );
    }
}

export default CompanyProfilesTable;