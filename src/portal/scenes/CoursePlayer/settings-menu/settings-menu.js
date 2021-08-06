import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import {
  onResolutionChange,
  getQualityFromHeight,
  getQualityAriaLabel,
  onKeyPressLanguage,
  onKeyDownLanguage,
} from './settings-menu-utils'

import { SearchIcon } from '@pluralsight/ps-design-system-icon'
import { setActiveMenu, setAutoplay, setLoading, setPlaybackSpeed, setCurrentResolution, setPreferredResolutions } from 'state/player/playerSlice'
import { CaptionLanguages, Menus, InteractionModes, PlaybackSpeedStops } from '../constants'
import { displayFeedbackForm } from '../utilities/feedback'
import LayeredMenuContainer from '../layered-menu/layered-menu-container'
import LayeredMenu from '../layered-menu/layered-menu'
import LayeredMenuSubmenu from '../layered-menu/layered-menu-submenu'
import LayeredMenuItem from '../layered-menu/layered-menu-item'
import css from './settings-menu.module.scss'

const getScrollPaneHeight = (layout, { desktopHeight, heightToSubtract }) => {
  heightToSubtract = heightToSubtract || 0
  switch (layout) {
    case '120p':
    case '240p':
      return `${96 - heightToSubtract}px`
    case '360p':
      return `${128 - heightToSubtract}px`
    case '480p':
      return `${180 - heightToSubtract}px`
    case '720p':
    case '1080p':
      return desktopHeight || `${212 - heightToSubtract}px`
    default:
      return null
  }
}

const SettingsMenu = props => {
  const menuRef = useRef(null)
  const {
    activeMenu,
    currentResolution,
    closedCaptioningLanguage,
    playbackSpeed,
    layout,
    setPlaybackSpeed,
    interactionMode,
    setAutoplay,
    userAutoplaySetting,
    nextCallback,
    isActive,
  } = props

  const [languageFilterString, setLanguageFilterString] = useState('')

  const [activeSettingsMenu, setActiveSettingsMenu] = useState({ id: 'MAIN', level: 0, height: 68 })
  const [activeItems, setActiveItems] = useState({
    QUALITY: '1080p',
    CAPTIONS: closedCaptioningLanguage && closedCaptioningLanguage.name,
    SPEED: '1x',
  })

  const setActive = (id, level) => {
    const menu = document.getElementById(id)
    const height = menu && menu.offsetHeight
    setActiveSettingsMenu({ id, level, height })
  }
  const setActiveItem = (menu, id) => setActiveItems({ ...activeItems, [menu]: id })

  const trapTabs = e => {
    if (e.which === 9) {
      const currentFocus = document.activeElement
      const focusableChildren = Array.from(
        menuRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), object, embed, *[tabindex], *[contenteditable]'
        )
      )
      const focusableCount = focusableChildren.length

      const focusedIndex = focusableChildren.indexOf(currentFocus)
      if (e.shiftKey) {
        if (focusedIndex === 0) {
          e.preventDefault()
          focusableChildren[focusableCount - 1].focus()
        }
      } else {
        if (focusedIndex === focusableCount - 1) {
          e.preventDefault()
          focusableChildren[0].focus()
        }
      }
    }
  }

  useEffect(() => {
    setActive('MAIN', 0)
  }, [])

  useEffect(() => {
    setActive('MAIN', 0)
  }, [activeMenu])

  useEffect(() => {
    menuRef && menuRef.current.children[0].children[0].children[0].focus()
  }, [isActive])

  useEffect(() => {
    setLanguageFilterString('')
  }, [activeSettingsMenu])

  useEffect(() => {
    closedCaptioningLanguage && setActiveItem('CAPTIONS', closedCaptioningLanguage.name)
  }, [closedCaptioningLanguage])

  useEffect(() => {
    setActiveItem('SPEED', `${playbackSpeed}x`)
  }, [playbackSpeed])

  const showPlaybackSpeed = layout === '360p' || layout === '240p' || layout === '120p'

  const getQualityMenuItems = () => {
    const { supportedResolutions, currentResolution } = props
    //console.log('Resolutions: ', currentResolution)
    const supportedResolves = [...supportedResolutions]
    return (
      supportedResolves &&
      supportedResolves
        .sort((a, b) => b.height - a.height)
        .map((r, i) => {
          const quality = getQualityFromHeight(r.height, props)
          return (
            <LayeredMenuItem
              key={`${quality}-${i}`}
              label={quality}
              ariaLabel={getQualityAriaLabel(r.height, currentResolution)}
              onClick={() => {
                setActiveItem('QUALITY', quality)
                onResolutionChange(r, props)
              }}
              isActive={currentResolution && currentResolution.height === r.height}
            />
          )
        })
    )
  }

  // const getLanguageMenuItems = () => {
  //   const { closedCaptioningLanguage, setClosedCaptioningLanguage } = props

  //   return CaptionLanguages.filter(language => language.name.toLowerCase().includes(languageFilterString)).map(
  //     language => {
  //       const selected = closedCaptioningLanguage && closedCaptioningLanguage.code === language.code
  //       return (
  //         <LayeredMenuItem
  //           data-testid={`caption-language-${language.code}`}
  //           data-value={language.code}
  //           key={language.code}
  //           onClick={() => {
  //             setClosedCaptioningLanguage && setClosedCaptioningLanguage(language)
  //             language && setActiveItem('CAPTIONS', language.name)
  //           }}
  //           onKeyPress={onKeyPressLanguage(language, props)}
  //           onKeyDown={onKeyDownLanguage(language, props)}
  //           aria-selected={selected}
  //           tabIndex="0"
  //           role="radiobutton"
  //           label={language.name}
  //           isActive={selected}
  //         />
  //       )
  //     }
  //   )
  // }

  const getPlaybackSpeedItems = () => {
    return PlaybackSpeedStops.map(speed => (
      <LayeredMenuItem
        key={`${speed}x`}
        label={`${speed}x`}
        onClick={() => {
          setActiveItem('SPEED', `${speed}x`)
          setPlaybackSpeed(speed)
        }}
        isActive={speed === playbackSpeed}
      />
    ))
  }

  const getIsAutoplayText = () => {
    return userAutoplaySetting ? 'On' : 'Off'
  }

  return (
    <div className={css['settings-menu']} ref={menuRef} tabIndex="-1" onKeyDown={trapTabs}>
      <LayeredMenuContainer hidden={activeMenu !== Menus.SETTINGS} height={activeSettingsMenu.height}>
        <LayeredMenu
          id="MAIN"
          isActive={activeSettingsMenu === 'MAIN'}
          activeSettingsMenu={activeSettingsMenu}
          isUsingKeyboard={interactionMode && interactionMode === InteractionModes.KEYBOARD}
        >
          {nextCallback && (
            <LayeredMenuItem
              direction="forward"
              label="Autoplay:"
              onClick={() => setActive('AUTOPLAY', 1)}
              selectedSubItem={getIsAutoplayText()}
            />
          )}
          <LayeredMenuSubmenu
            id="AUTOPLAY"
            isActive={activeSettingsMenu.id === 'AUTOPLAY'}
            ariaLabel={`select autoplay default`}
          >
            <LayeredMenuItem
              direction="back"
              label="Autoplay"
              onClick={() => setActive('MAIN', 0)}
              ariaLabel={`back to main menu`}
            />
            <LayeredMenuItem
              onClick={() => setAutoplay && setAutoplay(true)}
              label={`On`}
              isActive={userAutoplaySetting}
            ></LayeredMenuItem>
            <LayeredMenuItem
              onClick={() => setAutoplay && setAutoplay(false)}
              label={`Off`}
              isActive={!userAutoplaySetting}
            ></LayeredMenuItem>
          </LayeredMenuSubmenu>

          <LayeredMenuItem
            direction="forward"
            label="Quality:"
            onClick={() => setActive('QUALITY', 1)}
            selectedSubItem={getQualityFromHeight(currentResolution && currentResolution.height, props)}
          />
          <LayeredMenuSubmenu id="QUALITY" isActive={activeSettingsMenu.id === 'QUALITY'}>
            <LayeredMenuItem direction="back" label="Quality" onClick={() => setActive('MAIN', 0)} />
            <div
              className={css.scrollable}
              style={{ maxHeight: getScrollPaneHeight(layout, { desktopHeight: 'auto' }) }}
              aria-label="set quality"
              role="list"
            >
              {getQualityMenuItems()}
            </div>
          </LayeredMenuSubmenu>

          <LayeredMenuItem
            direction="forward"
            label="Captions:"
            onClick={() => setActive('CAPTIONS', 1)}
            selectedSubItem={activeItems && activeItems.CAPTIONS}
          />
          <LayeredMenuSubmenu
            id="CAPTIONS"
            isActive={activeSettingsMenu.id === 'CAPTIONS'}
            ariaLabel={`select caption language`}
          >
            <LayeredMenuItem
              direction="back"
              label="Captions"
              onClick={() => setActive('MAIN', 0)}
              ariaLabel={`back to captions menu`}
            />
            <span className={classNames(css['searchbox'])}>
              <SearchIcon size={SearchIcon.sizes.small} />
              <input
                name="caption-language-searchbox"
                className={css['searchbox__input']}
                data-testid="searchbox-input"
                aria-label="Search caption languages"
                placeholder="Search"
                onChange={e => setLanguageFilterString(e.target.value.toLowerCase())}
                value={languageFilterString}
                onTouchEnd={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
            </span>
            <div
              className={css.scrollable}
              style={{ height: getScrollPaneHeight(layout, { heightToSubtract: 46 }) }}
              aria-label="set caption language"
              role="list"
            >
              {/* {getLanguageMenuItems()} */}
            </div>
          </LayeredMenuSubmenu>
          {showPlaybackSpeed && (
            <>
              <LayeredMenuItem
                direction="forward"
                label="Speed:"
                onClick={() => setActive('SPEED', 1)}
                selectedSubItem={`${playbackSpeed}x`}
              />
              <LayeredMenuSubmenu
                id="SPEED"
                isActive={activeSettingsMenu.id === 'SPEED'}
                aria-label={'set playback speed'}
              >
                <LayeredMenuItem
                  direction="back"
                  label="Speed"
                  onClick={() => setActive('MAIN', 0)}
                  ariaLabel={`back to captions menu`}
                />
                <div
                  className={css.scrollable}
                  style={{ maxHeight: getScrollPaneHeight(layout, {}) }}
                  aria-label="set playback speed"
                  role="list"
                >
                  {getPlaybackSpeedItems()}
                </div>
              </LayeredMenuSubmenu>
            </>
          )}
          {/* <LayeredMenuItem onClick={() => displayFeedbackForm(props)} label="Send Feedback" /> */}
        </LayeredMenu>
      </LayeredMenuContainer>
    </div>
  )
}

export default connect(
  state => ({
    activeMenu: state.player.activeMenu,
    activeSettingsMenu: state.player.activeSettingsMenu,
    userAutoplaySetting: state.player.userAutoplaySetting,
    // boundedContext: state.boundedContext,
    bufferedTime: state.player.bufferedTime,
    // clipId: state.clipId,
    // clipTitle: state.clipTitle,
    // closedCaptioningEnabled: state.closedCaptioningEnabled,
    // closedCaptioningLanguage: state.closedCaptioningLanguage,
    courseTitle: state.player.courseTitle,
    currentResolution: state.player.currentResolution,
    // currentUrlIndex: state.currentUrlIndex,
    duration: state.player.duration,
    fullscreenState: state.player.fullscreenState,
    interactionMode: state.player.interactionMode,
    mediaType: state.player.mediaType,
    playbackSpeed: state.player.playbackSpeed,
    playing: state.player.playing,
    preferredResolutions: state.player.preferredResolutions,
    resolution: state.player.resolution,
    // resolutionValue: state.resolutionValue,
    // sessionId: state.sessionId,
    subtitle: state.player.subtitle,
    supportedResolutions: state.player.supportedResolutions,
    time: state.player.time,
    title: state.player.title,
    // urls: state.urls,
    // userId: state.userId,
    // versions: state.versions,
    volume: state.player.volume,
    playbackSpeed: state.player.playbackSpeed,
    layout: state.player.layout,
    // nextCallback: state.nextCallback,
  }),
  dispatch => ({
    
    setActiveMenu: payload => dispatch(setActiveMenu(payload)),

    setCurrentResolution: payload => dispatch(setCurrentResolution(payload)),
    setLoading: payload => dispatch(setLoading(payload)),
    setPreferredResolutions: payload => dispatch(setPreferredResolutions(payload)),
    setPlaybackSpeed: payload => dispatch(setPlaybackSpeed(payload)),
    setAutoplay: payload => dispatch(setAutoplay(payload)),
  })
)(SettingsMenu)

export { SettingsMenu }
