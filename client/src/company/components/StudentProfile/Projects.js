import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Card, Icon, Typography, Spin} from 'antd';

const {Content} = Layout;

class Projects extends Component {

    render() {
        const {loading, data} = this.props;
        const projectData = [];
        data.map(item =>
            projectData.push({
                project_id: item._id,
                project_name: item.project_name,
                guidance: item.guidance,
                project_location: item.project_location,
                description: item.description,
                start_date: item.start_date,
                end_date: item.end_date,
                active: item.active
            })
        );

        const Projects = () => projectData.map(project =>
            (<Card
                    key={project.project_id}
                    title={project.project_name}
                    style={{
                        margin: 5
                    }}
                >
                    <Typography.Text type='secondary'>
                        {project.guidance}
                    </Typography.Text>
                    <br/>
                    <Typography.Text type='secondary'>
                        {new Date(project.start_date).toLocaleDateString('en-US', {year: "2-digit", month: "short"}).concat(" - ", project.end_date === null ? "Ongoing" : new Date(project.end_date).toLocaleDateString('en-US', {year: "2-digit", month: "short"}))}
                    </Typography.Text>
                    <br/>
                    <Typography.Text type='secondary'>
                        {project.project_location}
                    </Typography.Text>
                    <br/>
                    <br/>
                    <Typography.Text>
                        {project.description}
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
                        <Projects/>
                    </Spin>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(Projects);
