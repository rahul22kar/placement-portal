import React, {Component} from 'react';
import {Card, Empty, List, Avatar} from 'antd';

class AnnouncementsCards extends Component {
    render() {
        let {announcements} = this.props;
        console.log(announcements);
        return (
            <div style={{margin: 10}}>
                <List
                    itemLayout={'vertical'}
                    size={'large'}
                    pagination={{pageSize: 5}}
                    dataSource={announcements}
                    renderItem={item => (
                        <List.Item
                            key={item._id}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                                title={<a href={item.href}>{item.subject}</a>}
                                description={"Created on "+new Date(item.created_on).toDateString()+" by Admin"}
                            />
                            {item.description}
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}

export default AnnouncementsCards;