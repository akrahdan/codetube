import { MediaTypes } from '../constants'

const requestNewUrls = props => {
  const { setLoading, requestUrls } = props
  setLoading && setLoading(true)
  requestUrls && requestUrls()
}

const onResolutionChange = (currentResolution, props) => {
  const { setCurrentResolution, setPreferredResolutions, mediaType, preferredResolutions } = props
  if (currentResolution !== props.currentResolution) setCurrentResolution && setCurrentResolution(currentResolution)
  if (preferredResolutions && currentResolution !== preferredResolutions[mediaType])
    setPreferredResolutions && setPreferredResolutions({ [mediaType]: currentResolution })
  if (mediaType !== MediaTypes.HLS) requestNewUrls(props)
}

const getQualityFromHeight = height => (typeof height === 'number' ? `${height}p` : height)

const getQualityAriaLabel = (height, currentResolution) => {
  return currentResolution && height === currentResolution.height
    ? `quality is ${getQualityFromHeight(height)}`
    : `set to ${getQualityFromHeight(height)}`
}

// LANGUAGE

const onKeyPressLanguage = (language, props) => e => {
  const { setClosedCaptioningLanguage } = props

  const keycode = e.keyCode || e.which

  if (keycode === 13) {
    e.preventDefault()
    e.stopPropagation()
    setClosedCaptioningLanguage && setClosedCaptioningLanguage(language)
    return true
  }
}

const onKeyDownLanguage = (language, props) => e => {
  const { setClosedCaptioningLanguage } = props

  const keycode = e.keyCode || e.which

  if (keycode === 13 || e.key == ' ') {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setClosedCaptioningLanguage && setClosedCaptioningLanguage(language)
    return true
  }
}

export {
  requestNewUrls,
  onResolutionChange,
  getQualityFromHeight,
  getQualityAriaLabel,
  onKeyPressLanguage,
  onKeyDownLanguage,
}
