import React, {Component} from 'react';
import {Modal, Row, Col, Layout, Descriptions, Avatar} from 'antd';

const {Content} = Layout;

class CompanyProfileModal extends Component {
    render() {
        const { data, modalState, onClose, isMobile} = this.props;

        return (
            <Modal
                title={data.email}
                visible={modalState}
                onCancel={onClose}
                onOk={onClose}
                width= {isMobile ?'90vw' : '50vw'}
            >
                <Layout
                    style={{background: '#fff'}}
                >
                    <Row type="flex" justify="center" style={{background: '#fff'}}>
                        <Col md={16} xs={24} sm={24} style={{margin: 10}}>
                            <Content
                                style={{
                                    background: "#fff"
                                }}
                            >
                                <Avatar src={data.logo_link} size={100} style={{margin: 10}}/>
                                <Descriptions column={1}>
                                    <Descriptions.Item label="Company Name" >{data.company_name}</Descriptions.Item>
                                    <Descriptions.Item label="Email" >{data.email}</Descriptions.Item>
                                    <Descriptions.Item label="Website" >{data.website}</Descriptions.Item>
                                    <Descriptions.Item label="Address" >{data.company_address}</Descriptions.Item>
                                    <Descriptions.Item label="Introduction">{data.company_introduction}</Descriptions.Item>
                                    <Descriptions.Item label="Last Modified">{new Date(data.last_modified_date).toDateString()}</Descriptions.Item>
                                </Descriptions>
                                {data.contact_details.map((contact, index) =>
                                    (<Descriptions key={index}>
                                            <Descriptions.Item lable="Designation">{contact.designation}</Descriptions.Item>
                                            <Descriptions.Item lable="Email">{contact.email}</Descriptions.Item>
                                            <Descriptions.Item label="Contact number">{contact.phone}</Descriptions.Item>
                                        </Descriptions>
                                    )
                                )
                                }
                            </Content>
                        </Col>
                    </Row>
                </Layout>
            </Modal>
        );
    }
}

export default CompanyProfileModal;
