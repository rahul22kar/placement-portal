import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Layout, Row, Typography} from 'antd'
import {withRouter} from 'react-router-dom'

import * as actionCreators from "../../../redux/actions";
import CompanyProfilesTable from "../../components/Companies/CompanyProfilesTable";

const {Content} = Layout;

class CompanyProfiles extends Component{

    componentDidMount() {
        this.props.onFetchProfiles()
    }

    render(){

        const {
            isMobile,
            loading,
            profiles
        } = this.props;

        const tableProps = {
            isMobile,
            profiles,
            loading
        };

        return(
            <Layout>
                <Content
                    style={{
                        background: '#fff',
                        margin: 10,
                        padding: 24
                    }}
                >
                    <Row type='flex' justify='center' style={{padding: 20}}>
                        <Typography.Title>
                            Company Profiles
                        </Typography.Title>
                    </Row>
                    <Row>
                        <CompanyProfilesTable {...tableProps}/>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.admin.table_loading,
        profiles: state.admin.company_profiles
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfiles: () => dispatch(actionCreators.getAdminCompanyProfiles())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyProfiles))
