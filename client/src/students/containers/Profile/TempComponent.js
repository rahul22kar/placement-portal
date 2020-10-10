import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import {Result, Button} from 'antd';

class TempComponent extends Component {
    render() {
        return (
            <div>
                <Result
                    title="Coming soon"
                    extra={
                        <Link to="/student/dashboard">
                            <Button type="primary" key="console">
                                Dashboard
                            </Button>
                        </Link>
                    }
                />
            </div>
        );
    }
}

export default withRouter(TempComponent);