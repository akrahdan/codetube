import { getSDK } from './get-sdk'
import { KNOWLEDGE_OWL_URL } from '../constants'
import { collapseFullscreen } from '../fullscreen-helper'

const knowledgeOwlPayloadToString = payload => {
  return Object.keys(payload)
    .filter(key => payload[key] !== undefined)
    .reduce(function(prev, curr) {
      prev.push(curr + ': ' + payload[curr])
      return prev
    }, [])
    .join('\n')
}

export const initKnowledgeOwl = async () => {
  const KnowledgeOwl = await getSDK(KNOWLEDGE_OWL_URL, 'KnowledgeOwl')
  KnowledgeOwl.init({ disableTriggerElement: true })
  return KnowledgeOwl
}

let KnowledgeOwl

const startKnowledgOwl = async () => {
  KnowledgeOwl = await initKnowledgeOwl()
}

startKnowledgOwl()

export const displayFeedbackForm = async props => {
  if (!KnowledgeOwl) KnowledgeOwl = await startKnowledgOwl()

  let payload = {
    autoplay: props.userAutoplaySetting,
    bufferedTime: props.bufferedTime,
    bufferedPercent: (props.bufferedTime / props.duration) * 100,
    courseTitle: props.courseTitle,
    clipTitle: props.clipTitle,
    clipId: props.clipId,
    closedCaptioningEnabled: props.closedCaptioningEnabled,
    closedCaptioningLanguage: props.closedCaptioningLanguage.name,
    currentResolution: props.currentResolution.height,
    currentTime: props.time,
    currentSrc: props.urls[props.currentUrlIndex].url,
    date: new Date().toGMTString(),
    embeddablePlayer: true,
    mediaType: props.mediaType,
    playbackSpeed: props.playbackSpeed,
    playedPercent: (props.time / props.duration) * 100,
    playing: props.playing ? props.playing : false,
    sessionId: props.sessionId,
    subtitle: props.subtitle,
    title: props.title,
    versions: JSON.stringify(props.versions),
    userAgent: navigator.userAgent,
    volume: props.volume,
  }

  let details = '\n---- Enter your message above ----\n' + knowledgeOwlPayloadToString(payload)

  let data = {
    initialForm: 'support-now',
    fields: {
      custom_contact_field_0: 'VideoNotes',
      details,
      requester: '',
    },
  }

  collapseFullscreen()

  window.dispatchEvent(new window.CustomEvent('knowledge_owl_show', { detail: data }))
}
