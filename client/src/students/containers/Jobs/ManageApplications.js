import React, {Component} from 'react';
import {Col, Layout, Row, Typography} from "antd";
import ManageApplicationsTable from "../../components/Jobs/ManageApplicationsTable";

const {Content} = Layout;

class ManageApplications extends Component {
    render() {

        const jobs = [
            {
                type_of_job: [
                    'full_time'
                ],
                eligible_branches: [
                    'cse',
                    'me',
                    'ee',
                    'mc'
                ],
                type_of_interview: [
                    'oncampus'
                ],
                skills: [
                    'NodeJS',
                    'Python',
                    'C++'
                ],
                test_type: [
                    'written'
                ],
                application_status: -1,
                active: true,
                _id: '5e96df51d440d910ac7311a9',
                email: 'company@iitgoa.ac.in',
                job_headline: 'Software Developer',
                job_description: 'Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.\n\nGoogle\'s software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We\'re looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Google’s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.\n\nGoogle is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology\'s greatest challenges and make an impact on millions, if not billions, of users. At Google, engineers not only revolutionize search, they routinely work on massive scalability and storage solutions, large-scale applications and entirely new platforms for developers around the world. From Google Ads to Chrome, Android to YouTube, Social to Local, Google engineers are changing the world one technological achievement after another.',
                job_location: 'Bangalore, India',
                job_designation: 'SDE-1',
                number_of_openings: '10',
                application_deadline: '2020-05-29T10:17:23.910Z',
                minimum_cpi: '8.5',
                special_requirements: '',
                resume_criteria: 'None',
                base_salary: '1500000',
                bonus_perks: '',
                other_pay: '',
                ctc_effective: '',
                members_oncampus: null,
                days_oncampus: null,
                other_requirement: '',
                company_name: 'Google',
                created_date: '2020-04-15T04:47:53.000Z',
                last_modified_date: '2020-04-15T04:47:53.000Z',
                applicants: [],
                __v: 0
            }
        ];

        const tableProps ={
            jobs,
            loading: false
        };

        return (
            <div>
                <Layout>
                    <Content
                        style = {{
                            margin: "6px",
                            padding: 24,
                            background: '#fff',
                        }}
                    >
                        <Row type={'flex'} justify={'center'}>
                            <Col
                                style={{margin: 12}}
                            >
                                <Typography.Title>Manage Applications</Typography.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ManageApplicationsTable {...tableProps}/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ManageApplications;