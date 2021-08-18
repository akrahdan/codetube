import React from 'react'
import { connect } from 'react-redux'
// import { connect } from 'unistore/react'
import { setClipProgress } from '../utilities/sync-clip-progress'

export class SyncClipProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate() {
    const { clipProgress } = this.props
    if (!clipProgress) return
    const clipProgressStr = JSON.stringify(clipProgress)
    if (this.state.clipProgressStr === clipProgressStr) return

    setClipProgress(clipProgress)

    this.setState({ clipProgressStr })
  }

  render() {
    return null
  }
}

export default connect(
  state => ({
    clipProgress: state.player.clipProgress
  }),
 
)(SyncClipProgress)
