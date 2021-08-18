import React from 'react'
import { connect } from 'react-redux'

// import * as actions from '../../actions'
import { syncSettings } from 'state/player/playerSlice'
export class SyncSettings extends React.Component {
  static get storageKey() {
    return 'ps-embeddable-player-settings'
  }

  static get version() {
    //return versions
  }

  static get settingsKeys() {
    return [
      'userAutoplaySetting',
      'closedCaptioningEnabled',
      'closedCaptioningLanguage',
      'muted',
      'playbackSpeed',
      'preferredResolutions',
      'previousVolume',
      'versions',
      'volume',
    ]
  }

  get localSettings() {
    return SyncSettings.settingsKeys.reduce((settings, key) => {
      settings[key] = this.props[key]
      return settings
    }, {})
  }

  set localSettings(settings) {
   this.props.syncSettings(settings)
  }

  get storageSettings() {
    const settings = localStorage.getItem(SyncSettings.storageKey)

    try {
      return JSON.parse(settings || '')
    } catch (e) {
      return null
    }
  }

  set storageSettings(settings) {
    return localStorage.setItem(SyncSettings.storageKey, JSON.stringify(settings))
  }

  componentDidMount() {
    const isVersioned = this.isVersioned(this.localSettings, this.storageSettings)

    if (isVersioned) {
      this.storageSettings = null
    }

    this.syncStorageToLocal()
    if (this.props.liveSync) {
      window.addEventListener('storage', this.handleStorage)
    }
  }

  componentWillUnmount() {
    if (this.props.liveSync) {
      window.removeEventListener('storage', this.handleStorage)
    }
  }

  componentDidUpdate() {
    this.syncLocalToStorage()
  }

  handleStorage = e => {
    if (e.key == SyncSettings.storageKey) {
      this.syncStorageToLocal()
    }
  }

  syncLocalToStorage() {
    const isChanged = this.isChanged(this.localSettings, this.storageSettings)

    if (isChanged) {
      this.storageSettings = this.localSettings
    }
  }

  syncStorageToLocal() {
    const isChanged = this.isChanged(this.localSettings, this.storageSettings)

    if (isChanged) {
      this.localSettings = this.storageSettings
    }
  }

  isChanged(a, b) {
    const aKeys = Object.keys(a || {})
    const bKeys = Object.keys(b || {})
    const keys = SyncSettings.settingsKeys
    let i = keys.length
    let isChanged = !a || !b

    while (!isChanged && i--) {
      const key = keys[i]
      let aValue = a[key]
      let bValue = b[key]

      if (typeof aValue === 'object') {
        aValue = JSON.stringify(aValue)
      }

      if (typeof bValue === 'object') {
        bValue = JSON.stringify(bValue)
      }

      isChanged = aValue != bValue
    }

    return isChanged
  }

  isVersioned(a, b) {
    try {
      return !a || !b || a.versions.VERSION != b.versions.VERSION
    } catch (e) {
      return false
    }
  }

  render() {
    return null
  }
}

export default connect(
  state => ({
    userAutoplaySetting: state.player.userAutoplaySetting,
    // closedCaptioningEnabled: state.closedCaptioningEnabled,
    // closedCaptioningLanguage: state.closedCaptioningLanguage,
    muted: state.player.muted,
    playbackSpeed: state.player.playbackSpeed,
    previousVolume: state.player.previousVolume,
    resolution: state.player.resolution,
    versions: state.versions,
    volume: state.player.volume,
    // closedCaptioningLanguage: state.closedCaptioningLanguage,
    preferredResolutions: state.player.preferredResolutions,
  }),
  dispatch => ({
    syncSettings: payload => dispatch(syncSettings(payload)),
  })
)(SyncSettings)
