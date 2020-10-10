import React, { Component } from "react"
import { Layout, Menu, Icon, Row, Col, Drawer} from "antd"
import { Link, withRouter} from "react-router-dom"
import Logo from '../../../../assets/images/White_Logo.png'

const { Sider } = Layout

const MenuItem = Menu.Item

class SideNav extends Component{

    state = {
        sider_collapse: false
    }
    handleBreakpoint = (broken) =>{
        this.setState({sider_collapse: broken});
    }

    render(){
        const {pathname} = this.props.location;
        const {sider_collapse} = this.state;
        let selectedKey = [];
        if (pathname != null) {
            let path_array = pathname.split('/')
            let key = path_array[2]
            selectedKey.push(key);
        }
        const Draw =
        <Drawer>
            <div style={{margin: 20}}>
                <Row type='flex' justify='center' align='middle'>
                    <Col>
                        <img src={Logo} alt="Logo" width='60px'/>
                    </Col>
                </Row>
            </div>
            <Menu
                theme = 'dark'
                mode = 'inline'
                selectedKeys = {selectedKey}
                style={{
                    height: '100%',
                    borderRight: 0
                }}
            >
                <MenuItem key = 'dashboard'>
                    <Link to = '/company/dashboard'>
                        <Icon type = 'dashboard'/>
                        <span>Dashboard</span>
                    </Link>
                </MenuItem>
                <MenuItem key = 'createjob'>
                    <Link to = '/company/createjob'>
                        <Icon type = 'form'/>
                        <span>Create Jobs</span>
                    </Link>
                </MenuItem>
                <MenuItem key = 'managejobs'>
                    <Link to = '/company/managejobs'>
                        <Icon type = 'edit'/>
                    <span>Manage Jobs</span>
                    </Link>
                </MenuItem>
                <MenuItem key = 'studentprofiles'>
                    <Link to = '/company/studentprofiles'>
                        <Icon type = 'idcard'/>
                        <span>Student Profiles</span>
                    </Link>
                </MenuItem>
                <MenuItem key = 'contactus'>
                    <Link to = '/company/contactus'>
                        <Icon type = 'contacts'/>
                        <span>Contact Us</span>
                    </Link>
                </MenuItem>
            </Menu>
        </Drawer>;
        const Side =
        <Sider
           width={250}
           style={{
               minHeight: '100vh'
           }}
           breakpoint={'md'}
           onBreakpoint = {this.handleBreakpoint}
           >
           <div style={{margin: 20}}>
               <Row type='flex' justify='center' align='middle'>
                   <Col>
                       <img src={Logo} alt="Logo" width='60px'/>
                   </Col>
               </Row>
           </div>
           <Menu
               theme = 'dark'
               mode = 'inline'
               selectedKeys = {selectedKey}
               style={{
                   height: '100%',
                   borderRight: 0
               }}
           >
               <MenuItem key = 'dashboard'>
                   <Link to = '/company/dashboard'>
                       <Icon type = 'dashboard'/>
                       <span>Dashboard</span>
                   </Link>
               </MenuItem>
               <MenuItem key = 'createjob'>
                   <Link to = '/company/createjob'>
                       <Icon type = 'form'/>
                       <span>Create Jobs</span>
                   </Link>
               </MenuItem>
               <MenuItem key = 'managejobs'>
                   <Link to = '/company/managejobs'>
                       <Icon type = 'edit'/>
                   <span>Manage Jobs</span>
                   </Link>
               </MenuItem>
               <MenuItem key = 'studentprofiles'>
                   <Link to = '/company/studentprofiles'>
                       <Icon type = 'idcard'/>
                       <span>Student Profiles</span>
                   </Link>
               </MenuItem>
               <MenuItem key = 'contactus'>
                   <Link to = '/company/contactus'>
                       <Icon type = 'contacts'/>
                       <span>Contact Us</span>
                   </Link>
               </MenuItem>
           </Menu>
       </Sider>;
        return(
         <div>
             {sider_collapse ? Draw : Side}
         </div>
        )
    }
}

export default withRouter(SideNav)
