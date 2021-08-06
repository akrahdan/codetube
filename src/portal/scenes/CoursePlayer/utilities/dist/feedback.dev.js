"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayFeedbackForm = exports.initKnowledgeOwl = void 0;

var _getSdk = require("./get-sdk");

var _constants = require("../constants");

var _fullscreenHelper = require("../fullscreen-helper");

var knowledgeOwlPayloadToString = function knowledgeOwlPayloadToString(payload) {
  return Object.keys(payload).filter(function (key) {
    return payload[key] !== undefined;
  }).reduce(function (prev, curr) {
    prev.push(curr + ': ' + payload[curr]);
    return prev;
  }, []).join('\n');
};

var initKnowledgeOwl = function initKnowledgeOwl() {
  var KnowledgeOwl;
  return regeneratorRuntime.async(function initKnowledgeOwl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getSdk.getSDK)(_constants.KNOWLEDGE_OWL_URL, 'KnowledgeOwl'));

        case 2:
          KnowledgeOwl = _context.sent;
          KnowledgeOwl.init({
            disableTriggerElement: true
          });
          return _context.abrupt("return", KnowledgeOwl);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.initKnowledgeOwl = initKnowledgeOwl;
var KnowledgeOwl;

var startKnowledgOwl = function startKnowledgOwl() {
  return regeneratorRuntime.async(function startKnowledgOwl$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(initKnowledgeOwl());

        case 2:
          KnowledgeOwl = _context2.sent;

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

startKnowledgOwl();

var displayFeedbackForm = function displayFeedbackForm(props) {
  var payload, details, data;
  return regeneratorRuntime.async(function displayFeedbackForm$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (KnowledgeOwl) {
            _context3.next = 4;
            break;
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(startKnowledgOwl());

        case 3:
          KnowledgeOwl = _context3.sent;

        case 4:
          payload = {
            autoplay: props.userAutoplaySetting,
            bufferedTime: props.bufferedTime,
            bufferedPercent: props.bufferedTime / props.duration * 100,
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
            playedPercent: props.time / props.duration * 100,
            playing: props.playing ? props.playing : false,
            sessionId: props.sessionId,
            subtitle: props.subtitle,
            title: props.title,
            versions: JSON.stringify(props.versions),
            userAgent: navigator.userAgent,
            volume: props.volume
          };
          details = '\n---- Enter your message above ----\n' + knowledgeOwlPayloadToString(payload);
          data = {
            initialForm: 'support-now',
            fields: {
              custom_contact_field_0: 'VideoNotes',
              details: details,
              requester: ''
            }
          };
          (0, _fullscreenHelper.collapseFullscreen)();
          window.dispatchEvent(new window.CustomEvent('knowledge_owl_show', {
            detail: data
          }));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.displayFeedbackForm = displayFeedbackForm;