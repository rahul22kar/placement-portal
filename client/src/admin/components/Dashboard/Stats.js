import React, {Component} from 'react';
import {Card, Row, Col, Typography} from 'antd';
import {PieChartOutlined, EditOutlined} from '@ant-design/icons';

const {Meta} = Card;

class Stats extends Component {
    render() {
        const {Title, Number, Color} = this.props;
        return (
             <Col sm={{span: 24}} md={{span: 8}} xl={{span: 8}} xxl={{span: 6}}>
                 <Card
                     style={{background: Color, margin: 10}}
                     actions={[
                         <PieChartOutlined key="statistics" />,
                         <EditOutlined key="details" />
                     ]}
                 >
                     <Row type={'flex'} justify={'center'}>
                         <Col>
                             <Row type={'flex'} justify={'center'}>
                                 <Typography.Title style={{color: '#ffffff', fontSize: '1.8em'}}>
                                     {Title}
                                 </Typography.Title>
                             </Row>
                             <Row type={'flex'} justify={'end'}>
                                 <Typography.Title style={{color: '#ffffff', fontSize: '2em'}}>
                                     {Number}
                                 </Typography.Title>
                             </Row>
                         </Col>
                     </Row>
                 </Card>
             </Col>

        );
    }
}

export default Stats;