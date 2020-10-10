import React, {Component} from 'react';
import { Modal, Row, Col, Layout} from 'antd';

import Profile from './ModalComponents/Profile'


class StudentProfileModal extends Component {
    render() {
        const { data, modalState, onClose, commonConstants} = this.props;

        const profileProps = {
            profileData: data,
            commonConstants
        };

        return (
            <Modal
                title={data.email}
                visible={modalState}
                onCancel={onClose}
                onOk={onClose}
            >
                <Layout
                    style={{background: '#fff'}}
                    >
                    <Row type="flex" justify="center" style={{background: '#fff'}}>
                        <Col xs={24} sm={24} style={{margin: 10}}>
                            <Profile {...profileProps}/>
                        </Col>
                    </Row>
                </Layout>
            </Modal>
        );
    }
}

export default StudentProfileModal;
