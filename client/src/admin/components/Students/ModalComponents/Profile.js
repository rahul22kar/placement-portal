import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, List, Typography, Tag, Divider, Icon, Descriptions} from 'antd';

const {Content} = Layout;
const {Item} = List;
const {Title, Text} = Typography;

class Profile extends Component {

    render() {
        let profile = null;
        const {profileData, commonConstants} = this.props;

            profile = (
                <div>
                    <Content
                        style={{
                            padding: 24,
                            background: "#fff"
                        }}
                    >
                        <Content style={{textAlign: "center"}}>
                            <Title level={3} style={{marginBottom: 0}}>
                                {
                                    profileData.middle_name && profileData.middle_name.length > 0 ?
                                        profileData["first_name"] + " " + profileData["middle_name"] + " " + profileData["last_name"]
                                        :
                                        profileData["first_name"] + " " + profileData["last_name"]
                                }
                            </Title>
                            <Text type="secondary">
                                {commonConstants.branchToTextMap[profileData["branch"]]}
                            </Text>
                        </Content>
                        <List split={false}>
                            <Item style={{paddingBottom: 0}}>
                                <Icon type="mail"/> &nbsp;
                                <Text>
                                    {profileData["email"]}
                                </Text>
                            </Item>
                            <Item style={{paddingTop: 0, paddingBottom: 0}}>
                                <Icon type="phone"/> &nbsp;
                                <Text>
                                    {profileData["phone_a"]}
                                </Text>
                            </Item>
                            <Item style={{paddingTop: 0, paddingBottom: 0}}>
                                <Icon type="environment"/> &nbsp;
                                <Text>
                                    {profileData["address_line_a"]}
                                </Text>
                            </Item>
                            <Item style={{paddingTop: 0}}>
                                <Icon type="environment"/> &nbsp;
                                <Text>
                                    {profileData["address_line_b"]}
                                </Text>
                            </Item>
                        </List>
                        <Divider dashed style={{margin: "10px 0 10px 0"}}/>
                        <Text strong>
                            Interests
                        </Text>
                        <br/><br/>
                        {
                            profileData.interests ? profileData["interests"].map(item =>
                                <Tag key={item} color='blue' style={{margin: 5}}>{item}</Tag>
                            ) : null
                        }
                        <Divider dashed style={{margin: "20px 0 10px 0"}}/>
                        <Text strong>
                            Skills
                        </Text>
                        <br/><br/>
                        {
                            profileData.skills ? profileData["skills"].map(item =>
                                <Tag key={item} color='blue' style={{margin: 5}}>{item}</Tag>
                            ) : null
                        }
                        <Divider dashed style={{margin: "20px 0 10px 0"}}/>
                        <Text strong>
                            Academic Details
                        </Text>
                        <br/><br/>
                        <Descriptions column={1}>
                            <Descriptions.Item label="CPI">{profileData["cpi"]}</Descriptions.Item>
                            <Descriptions.Item label="Course">{profileData["course_type"]}</Descriptions.Item>
                            <Descriptions.Item label="Year of Study">{profileData["year_of_study"]}</Descriptions.Item>
                            {
                                profileData.cv[0] ? <Descriptions.Item label="Link to CV 1"><a href={profileData.cv[0].link} target={"_blank"}>Click Here</a></Descriptions.Item> : null
                            }
                            {
                                profileData.cv[1] ? <Descriptions.Item label="Link to CV 2"><a href={profileData.cv[1].link} target={"_blank"}>Click Here</a></Descriptions.Item> : null
                            }
                            {
                                profileData.cv[2] ? <Descriptions.Item label="Link to CV 3"><a href={profileData.cv[2].link} target={"_blank"}>Click Here</a></Descriptions.Item> : null
                            }
                        </Descriptions>
                    </Content>
                </div>
            );
        return (
            <Layout>
                <Content>
                    {profile}
                </Content>
            </Layout>
        );
    }
}

export default withRouter(Profile);
