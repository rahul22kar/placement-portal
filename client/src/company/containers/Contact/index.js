import React, { Component } from 'react';
import { Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';

import ContactForm from '../../components/Contact';


class Contact extends Component {
    render(){
        return(
            <Row type="flex" justify="center">
                <Col span={24}>
                    <ContactForm/>
                </Col>
            </Row>
        );
    }
};


export default withRouter(Contact);
