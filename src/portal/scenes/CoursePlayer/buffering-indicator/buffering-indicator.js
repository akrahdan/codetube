import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgress from '@pluralsight/ps-design-system-circularprogress'

import css from './buffering-indicator.module.css'


export class BufferingIndicator extends Component {
  render() {
    const { buffering, loading } = this.props

    const active = buffering || loading

    if (!active) return null

    return (
      <div className={css.bufferingIndicator}>
        <CircularProgress />
      </div>
    )
  }
}

export default connect(
  state => ({
    buffering: state.player.buffering,
    loading: state.player.loading,
  }),
  null
)(BufferingIndicator)
