import React, { Component } from 'react'
import {Spin} from 'antd'
import PropTypes from 'prop-types'

export default class Page extends Component {
  render() {
    const { children, loading = false } = this.props;
    return (
      <div>
        <Spin spinning={loading} tip="Loading">
            {children}
        </Spin>
      </div>
    )
  }
}

Page.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool
};
