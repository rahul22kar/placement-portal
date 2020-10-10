import React, {Component} from 'react';
import {DatePicker, Table} from "antd";
import * as commonConstants from "../../../utils/Constants";
import moment from "moment";

class ConfigurePortalTable extends Component {

    state = {
        selectedRowKeys: this.props.data.filter((batch) => batch.open).map((batch) => batch.key)
    };

    onDateChange = (branch, date) => {
        console.log(date, branch);
    };

    handleOnChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
        selectedRowKeys.map((key) => this.props.data[key].open=true);
        console.log(selectedRowKeys)
    };

    render() {
        const disabledDate = startValue => {
            return moment(new Date(startValue), "YYYY-MM-DD").isBefore(
                moment(new Date(), "YYYY-MM-DD")
            );
        };

        const columns = [
            {
                title: "Batch",
                dataIndex: 'batch',
                key: "batch",
                align: 'center',
                render : (text) =>
                    commonConstants.yearToTextMap[text]
            },
            {
                title: "Registration Deadline",
                dataIndex: 'deadline',
                key: 'deadline',
                align: 'center',
                render : (date, row) =>
                    <DatePicker
                        initialValue={new Date(date)}
                        disabled={!row.open}
                        disabledDate={disabledDate}
                        onChange={() => this.onDateChange(row.branch)}
                    />
            },
        ];

        const rowSelection = {
            columnTitle: "Open Registration",
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleOnChange
        };

        const tableProps = {
            columns,
            loading: false,
            rowSelection,
            dataSource: this.props.data,
            bordered: true,
        };

        return (
            <Table {...tableProps} />
        );
    }
}

export default ConfigurePortalTable;