import React, {Component} from 'react'
import {Form, InputNumber, Input, Button, Popconfirm} from 'antd'

class LogisticsDetails extends Component{

    handleBack = () => {
        const values = this.props.form.getFieldsValue();
        this.props.submitValues(values);
        this.props.handleBack()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values)
            }
        })
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div style={{textAlign: 'center'}}>
                <Form colon={false}>
                    <Form.Item label="Number of Members for On-campus visit">
                        {getFieldDecorator("members_oncampus", {
                            initialValue: this.props.members_oncampus
                        })(
                            <InputNumber
                                min={1}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Number of Days for On-campus visit">
                        {getFieldDecorator("days_oncampus", {
                            initialValue: this.props.days_oncampus
                        })(
                            <InputNumber
                                min={1}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Other Requirements">
                        {getFieldDecorator("other_requirement", {
                            initialValue: this.props.other_requirement
                        })(
                            <Input.TextArea
                                rows={3}
                                placeholder="Other Specific requirements during on-campus visit"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleBack} style={{margin: 5}}>
                            Back
                        </Button>
                        <Popconfirm
                            placement="bottom"
                            onConfirm={this.handleSubmit}
                            title="Do you want to Submit?"
                            >
                            <Button type='primary' style={{margin: 5}}>
                                Submit
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const LogisticsDetailsForm = Form.create({name: "logisticdetails"})(LogisticsDetails);

export default LogisticsDetailsForm
