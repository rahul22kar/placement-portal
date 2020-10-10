import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Card, Icon, Typography, Spin} from 'antd';

const {Content} = Layout;

class Experience extends Component {

    render() {
        const {data, onEditExperience, handleRemoveExperience, loading} = this.props;
        const experienceData = [];

        data.map(item =>
            experienceData.push({
                experience_id: item._id,
                title: item.experience_type,
                company_name: item.company_name,
                experience_location: item.experience_location,
                description: item.description,
                start_date: item.start_date,
                end_date: item.end_date,
                active: item.active
            })
        );
        const Experience = () => experienceData.map(experience =>
            (<Card
                title={experience.company_name + ', ' + experience.experience_location}
                key={experience.experience_id}
                extra={
                    <div>
                        <Icon type='edit' style={{fontSize: 15, marginRight: 15}} onClick={() => onEditExperience(experience)}/>
                        <Icon type='minus-circle' style={{fontSize: 15}} onClick={() => handleRemoveExperience(experience.experience_id)}/>
                    </div>
                }
                style={{margin: 5}}
                >
                <Typography.Text type='primary'>
                    {experience.title}
                </Typography.Text>
                    <br />
                <Typography.Text type='secondary'>
                    {new Date(experience.start_date).toLocaleDateString('en-US', {year: "2-digit", month: "short"}).concat(" - ", experience.active === true ? "Ongoing" : new Date(experience.end_date).toLocaleDateString('en-US', {year: "2-digit", month: "short"}))}
                </Typography.Text>
                <br/>
                <br />
                <Typography.Text>
                    {experience.description.split("\n").map((line, i) => <span key={i}>{line}<br/></span>)}
                </Typography.Text>
            </Card>
        ));
        return (
            <Layout>
                <Content
                    style={{
                        background: '#fff'
                    }}
                >
                     <Spin spinning={loading}>
                         <Experience/>
                     </Spin>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(Experience);
