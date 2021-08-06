import React, {useRef, useEffect, useState} from 'react'

import classnames from 'classnames'
import { debounce } from '../utilities/debounce'

import css from './captions.module.css'

/*
  Available cue properties (at least in Chrome):
  
  align: "center"
  endTime: 4.3
  id: "2"
  line: "auto"
  onenter: null
  onexit: null
  pauseOnExit: false
  position: "auto"
  size: 100
  snapToLines: true
  startTime: 2.5
  text: "All of it is bad"
  track: TextTrack {kind: "captions", label: "bosanski", language: "bs", id: "", mode: "hidden", …}
  vertical: ""
*/

function calculateLetterSpacing(fontSize) {
  if(fontSize < 14) return '0.02em'
  if(fontSize < 18) return '0.015em'
  if(fontSize < 24) return '0.01em'
  if(fontSize < 30) return '0.005em'
  return '-0.01em'
}

export const Captions = () => {
  // { visible: uiVisible, closedCaptioningEnabled, closedCaptioningCues }
  const closedCaptioningCues = null;
  const closedCaptioningEnabled = null;
  const captionsContainer = useRef(null)
  const [captionsFontSize, setCaptionsFontSize] = useState(0)
  const [captionsLetterSpacing, setCaptionsLetterSpacing] = useState('normal')
  const uiVisible = true;
  const cnames = classnames(css.captions, { [css.adjust]: !uiVisible })

  useEffect(() => {
    const handleResize = debounce(() => {
      const fontSize = Math.max(captionsContainer.current?.clientWidth / 52 || 0, 14) // magic!
      const letterSpacing = calculateLetterSpacing(fontSize)
      setCaptionsFontSize(fontSize)
      setCaptionsLetterSpacing(letterSpacing)
    }, 100)

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!closedCaptioningEnabled) return null

  return (
    <div
      ref={captionsContainer}
      className={cnames}
      // aria-live="polite" aria-atomic="true" aria-relevant="additions" //TODO: maybe only use this for assistive/alternate text, doesn't make sense to read the captions out loud
    >
      {closedCaptioningCues && Object.values(closedCaptioningCues).map(cue =>
      <div className={css.cue} key={cue.id} style={{ fontSize: `${captionsFontSize}px`, letterSpacing: captionsLetterSpacing }}>
        {cue.text}
      </div>
    )}
    </div>
  )
}
export default Captions;
// export default connect(
//   state => ({
//     visible: state.visible,
//     closedCaptioningEnabled: state.closedCaptioningEnabled,
//     closedCaptioningCues: state.closedCaptioningCues,
//   }),
//   store => {}
// )(Captions)
