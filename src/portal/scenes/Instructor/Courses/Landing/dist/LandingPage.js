"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.LandingPage = void 0;
var courses_1 = require("services/courses");
var selectors_1 = require("state/location/selectors");
var hooks_1 = require("store/hooks");
var react_1 = require("react");
var client = require("filestack-js");
var react_player_1 = require("react-player");
var react_autosuggest_1 = require("react-autosuggest");
var theme_1 = require("react-autosuggest/dist/theme");
var lite_1 = require("algoliasearch/lite");
var UploadProgress_1 = require("./UploadProgress");
var Editor_1 = require("portal/scenes/Instructor/Editor");
var classnames_1 = require("classnames");
var userPrompt_1 = require("../userPrompt");
var style_module_scss_1 = require("./style.module.scss");
var filestack = client.Filestack(process.env.REACT_APP_FILESTACK_APP_KEY, {});
var searchClient = lite_1["default"](process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);
exports.LandingPage = function () {
    var getSuggestions = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var inputValue, inputLength, results, suggestions, courseSuggestions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputValue = query.trim().toLowerCase();
                    inputLength = inputValue.length;
                    if (inputLength === 0)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, searchClient.initIndex('tags_index').search(inputValue)];
                case 1:
                    results = _a.sent();
                    suggestions = results.hits.map(function (hit) {
                        return hit;
                    });
                    console.log('Response', suggestions);
                    courseSuggestions = __spreadArrays(suggestions, [{ isAddNew: true }]);
                    return [2 /*return*/, courseSuggestions];
            }
        });
    }); };
    var locationPayload = hooks_1.useAppSelector(selectors_1.selectLocationPayload);
    var _a = courses_1.useFetchCourseQuery(locationPayload.id), course = _a.data, isLoading = _a.isLoading;
    var levels = courses_1.useFetchCourseLevelQuery().data;
    var categories = courses_1.useFetchCategoriesQuery().data;
    var _b = react_1.useState(false), uploading = _b[0], setUploading = _b[1];
    var _c = react_1.useState(false), videoUploading = _c[0], setVideoUploading = _c[1];
    var _d = react_1.useState(0), progress = _d[0], setProgress = _d[1];
    var _e = react_1.useState([]), mediaResources = _e[0], setMediaResources = _e[1];
    var _f = react_1.useState(null), error = _f[0], setError = _f[1];
    var _g = react_1.useState('Progress'), status = _g[0], setStatus = _g[1];
    var _h = react_1.useState(null), files = _h[0], setFiles = _h[1];
    var _j = react_1.useState(), category = _j[0], setCategory = _j[1];
    var _k = react_1.useState([]), suggestions = _k[0], setSuggestions = _k[1];
    var _l = react_1.useState(''), suggestionValue = _l[0], setSuggestionValue = _l[1];
    var _m = react_1.useState([]), tags = _m[0], setTags = _m[1];
    userPrompt_1.usePrompt(true);
    var onProgress = function (eve) {
        console.log(eve.totalPercent);
        setProgress(eve.totalPercent);
    };
    var onUpload = function (files, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setError(null);
            setStatus('Progress');
            setUploading(true);
            filestack.upload(files, { onProgress: onProgress })
                .then(function (results) {
                setCourseUpdate(__assign(__assign({}, courseUpdate), { cover_image: results.url }));
            })["catch"](function (err) {
                setStatus('Failed');
                console.log(err);
                setError(err.status);
            });
            return [2 /*return*/];
        });
    }); };
    var onVideoUpload = function (files, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setError(null);
            setStatus('Progress');
            setVideoUploading(true);
            filestack.upload(files, { onProgress: onProgress })
                .then(function (results) {
                setCourseUpdate(__assign(__assign({}, courseUpdate), { video_url: results.url }));
            })["catch"](function (err) {
                setStatus('Failed');
                console.log(err);
                setError(err.status);
            });
            return [2 /*return*/];
        });
    }); };
    var _o = react_1.useState(course), courseUpdate = _o[0], setCourseUpdate = _o[1];
    var renderSuggestion = function (suggestion) {
        if (suggestion.isAddNew) {
            return (React.createElement("div", { className: "course-labels--propose-label--1zROI" },
                React.createElement("a", { role: "button", tabIndex: 0 },
                    "Propose new topic ",
                    suggestionValue)));
        }
        console.log('Suggestions: ', suggestion.name);
        return React.createElement("span", { className: "course-labels--course-label--1Vi_C label label-default" }, suggestion.name);
    };
    var theme = __assign(__assign({}, theme_1.defaultTheme), { container: 'autosuggest-theme--container--aLRPK', itemsContainer: 'label-manager--suggestions-container--2TqhD', item: 'autosuggest-theme--suggestion--Ut3Fu' });
    var onSuggestionsFetchRequested = function (_a) {
        var value = _a.value;
        getSuggestions(value)
            .then(function (results) { return setSuggestions(results); });
    };
    var handleSuggestionChange = function (event, _a) {
        var newValue = _a.newValue, method = _a.method;
        setSuggestionValue(newValue);
    };
    var suggestInputProps = {
        placeholder: 'Type suggestion',
        value: suggestionValue,
        className: 'form-control',
        onChange: handleSuggestionChange
    };
    react_1.useEffect(function () {
    }, []);
    react_1.useEffect(function () {
        setCourseUpdate(course);
    }, [course]);
    if (isLoading || !courseUpdate) {
        return (React.createElement("div", { className: "ud-app-loader" },
            React.createElement("div", { className: "sub-header--wrapper--3Vunm" },
                React.createElement("div", { className: "sub-header--main-content--22it3" },
                    React.createElement("h2", { "data-purpose": "page-title", className: "font-heading-serif-xl sub-header--title--2VD8q" }, "Course landing page"))),
            React.createElement("div", { className: "main-content--wrap_component--2TEkz" },
                React.createElement("form", null,
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: classnames_1["default"]("cfi-medium", "cfi", "cfi-circle-loader", style_module_scss_1["default"].loader) }))))));
    }
    var validateFileType = function (fileItem) {
        var fileType = fileItem.filetype; // image/png image/jpeg
        var rootType = fileType.split("/")[0];
        switch (rootType) {
            case "image":
                return 'File';
            default:
                return 'Video';
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "sub-header--wrapper--3Vunm" },
            React.createElement("div", { className: "sub-header--main-content--22it3" },
                React.createElement("h2", { "data-purpose": "page-title", className: "font-heading-serif-xl sub-header--title--2VD8q" }, "Course landing page"))),
        React.createElement("div", { className: "main-content--wrap_component--2TEkz" },
            " ",
            React.createElement("form", null,
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "title", className: "control-label" }, "Course title"),
                    React.createElement("div", { className: "form-control-counter-container" },
                        React.createElement("input", { placeholder: "Insert your course title.", name: "title", "data-purpose": "edit-course-title", maxLength: 60, value: courseUpdate.title, onChange: function (event) { return setCourseUpdate(__assign(__assign({}, courseUpdate), { title: event.target.value })); }, id: "title", className: "form-control" }),
                        React.createElement("div", { className: "form-control-counter", "data-purpose": "form-control-counter" }, courseUpdate.title ? courseUpdate.title.length : null))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "headline", className: "control-label" }, "Course subtitle"),
                    React.createElement("div", { className: "form-control-counter-container" },
                        React.createElement("input", { placeholder: "Insert your course subtitle.", name: "headline", "data-purpose": "course-headline", maxLength: 120, id: "headline", className: "form-control" }),
                        React.createElement("div", { className: "form-control-counter", "data-purpose": "form-control-counter" }, "120"))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "description", className: "control-label" }, "Course description"),
                    React.createElement(Editor_1.RTEditor, { editorValue: courseUpdate.description, handleChange: function (value) {
                            return setCourseUpdate(__assign(__assign({}, courseUpdate), { description: value }));
                        } })),
                React.createElement("div", null,
                    React.createElement("p", null, "Basic info"),
                    React.createElement("div", { className: "course-basics-form--inline-fields--3ZuU2" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { htmlFor: "instructional_level", className: "sr-only control-label" }, "Course instructional level"),
                            React.createElement("div", { className: "form-control-single-select-container" },
                                React.createElement("select", { title: "Instructional level", id: "instructional_level", className: "form-control" },
                                    React.createElement("option", { value: -1 }, "-- Select Level --"),
                                    levels && levels.map(function (level) { return React.createElement("option", { key: level.name, value: level.name }, level.display); })))),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { htmlFor: "category", className: "sr-only control-label" }, "Course category"),
                            React.createElement("div", { className: "form-control-single-select-container" },
                                React.createElement("select", { title: "Category", id: "category", value: category && category.id, onChange: function (event) {
                                        var newCat = categories && categories.find(function (cat) { return cat.id == Number(event.target.value); });
                                        if (newCat)
                                            setCategory(newCat);
                                    }, className: "form-control" },
                                    React.createElement("option", { value: -1 }, "-- Select Category --"),
                                    categories && categories.map(function (category) { return React.createElement("option", { key: category.id, value: category.id }, category.title); })))),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { htmlFor: "subcategory", className: "sr-only control-label" }, "Course subcategory"),
                            React.createElement("div", { className: "form-control-single-select-container" },
                                React.createElement("select", { title: "Subcategory", id: "subcategory", className: "form-control" },
                                    React.createElement("option", { value: -1 }, "-- Select Subcategory --"),
                                    category && category.children && category.children.map(function (cat) { return React.createElement("option", { key: cat.id, value: cat.id }, cat.title); }))))),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", null,
                            React.createElement("div", null,
                                React.createElement("div", { className: "label-manager--sublabel--kpb1O" },
                                    React.createElement("span", { "data-purpose": "safely-set-inner-html:label-manager:what-is-taught" },
                                        "What is ",
                                        React.createElement("strong", null, "primarily"),
                                        " taught in your course?"),
                                    React.createElement("span", { className: "label-manager--tooltip-icon--15XkO overlay-with-pointer cfi cfi-info-circle" }))),
                            React.createElement("div", { className: "m0 row" },
                                React.createElement("div", { className: "col-sm-6 pl0 pr0" },
                                    React.createElement("span", { className: "course-labels--course-labels--gbBja" }, tags && tags.map(function (tag) { return (React.createElement(React.Fragment, null,
                                        React.createElement("span", { className: "course-labels--course-label--1Vi_C label label-default" },
                                            React.createElement("span", null, tag),
                                            React.createElement("span", { className: "cfi cfi-close course-labels--course-label__icon--cBTbb", role: "button", tabIndex: 0 })))); })),
                                    ";",
                                    React.createElement(react_autosuggest_1["default"], { suggestions: suggestions, renderSuggestion: renderSuggestion, inputProps: suggestInputProps, theme: theme, onSuggestionSelected: function (event, _a) {
                                            var suggestion = _a.suggestion;
                                            if (suggestion.isAddNew) {
                                                setTags(__spreadArrays(tags, [
                                                    suggestionValue
                                                ]));
                                            }
                                            else {
                                                setTags(__spreadArrays(tags, [
                                                    suggestion.name
                                                ]));
                                            }
                                        }, onSuggestionsClearRequested: function () {
                                            setSuggestions([]);
                                        }, getSuggestionValue: function (suggestion) {
                                            if (suggestion.isAddNew)
                                                return suggestionValue;
                                            return suggestion.name;
                                        }, onSuggestionsFetchRequested: onSuggestionsFetchRequested })))))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label" }, "Course image"),
                    React.createElement("div", null,
                        React.createElement("div", { className: "image-upload-preview-with-crop--stack--URrDD" },
                            React.createElement("div", { className: "image-upload-preview-with-crop--previewWrapper--1eYsy" },
                                React.createElement("div", { className: "image-upload-preview-with-crop--imageWrapper--fNINE" },
                                    React.createElement("img", { alt: "Course image", src: courseUpdate.cover_image ? courseUpdate.cover_image : "https://s.udemycdn.com/course/750x422/placeholder.jpg" })),
                                React.createElement("div", { className: "image-upload-preview-with-crop--tips--17Lj2" })),
                            React.createElement("div", { className: "image-upload-preview-with-crop--form-element--2Nnsf" },
                                React.createElement("div", null,
                                    React.createElement("p", null,
                                        React.createElement("span", null,
                                            "Upload your course image here. It must meet our",
                                            " ",
                                            React.createElement("a", { href: "https://support.udemy.com/hc/en-us/articles/229232347", target: "_blank", rel: "noopener noreferrer" }, "course image quality standards"),
                                            " ",
                                            "to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image."))),
                                React.createElement("div", { className: "file-uploader--file-selector--SGCns" }, uploading ? React.createElement(UploadProgress_1.UploadProgress, { progress: progress, changeUpload: function () { return setUploading(!uploading); } }) : (React.createElement(React.Fragment, null,
                                    React.createElement("input", { accept: ".gif,.jpg,.jpeg,.png", type: "file", onChange: function (event) { return onUpload(event.target.files[0], onProgress); }, id: "FileUploaderS3-0--24", className: "sr-only" }),
                                    React.createElement("label", { htmlFor: "FileUploaderS3-0--24" },
                                        React.createElement("span", { className: "input-group" },
                                            React.createElement("div", { className: "form-control file-uploader--fake-file-input--1_ohV" }, "No file selected"),
                                            React.createElement("span", { className: "input-group-btn" },
                                                React.createElement("div", { "data-type": "button", className: "btn btn-default" }, "Upload File"))))))),
                                React.createElement("input", { type: "hidden" }))))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label" }, "Promotional video"),
                    React.createElement("div", { className: "video-upload-with-preview--wrapper--1Gozg" },
                        React.createElement("div", { className: "video-upload-with-preview--previewWrapper--2cwTN" },
                            courseUpdate.video_url ? React.createElement(react_player_1["default"], { light: true, className: "contained", url: courseUpdate.video_url, width: "480px", height: "270px" }) : (React.createElement("img", { className: "contained", "data-purpose": "image-preview", alt: "placeholder", width: 480, height: 270, src: "https://s.udemycdn.com/course/480x270/placeholder.jpg" })),
                            (videoUploading && progress < 100) && React.createElement("div", { className: "uploading-backdrop--wrapperLoader--3qlfG" },
                                React.createElement("span", { "aria-label": "Loading", className: "uploading-backdrop--loader--23uMA cfi-medium cfi cfi-circle-loader" }))),
                        React.createElement("div", { className: "video-upload-with-preview--formElement--3gzlF" },
                            React.createElement("div", { className: "video-upload-with-preview--tips--31TuE" },
                                React.createElement("div", { className: "tip" },
                                    React.createElement("p", { "data-purpose": "safely-set-inner-html:course-basics-form:promo-video-content-link" },
                                        "Students who watch a well-made promo video are",
                                        " ",
                                        React.createElement("b", null, "5X more likely to enroll"),
                                        " in your course. We've seen that statistic go up to 10X for exceptionally awesome videos.",
                                        " ",
                                        React.createElement("a", { href: "https://info.udemy.com/perfect-promo?utm_source=udemy-main&utm_medium=web&utm_content=inline-content&utm_campaign=promo-optimization", rel: "noopener noreferrer", className: "ext" }, "Learn how to make yours awesome!")))),
                            React.createElement("div", { className: "file-uploader--file-selector--SGCns", "data-purpose": true }, videoUploading ? React.createElement(UploadProgress_1.UploadProgress, { progress: progress, changeUpload: function () { return setUploading(!videoUploading); } }) : (React.createElement(React.Fragment, null,
                                React.createElement("input", { accept: ".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv", type: "file", onChange: function (event) { return onVideoUpload(event.target.files[0], onProgress); }, id: "FileUploaderS3-0--25", className: "sr-only" }),
                                React.createElement("label", { htmlFor: "FileUploaderS3-0--25" },
                                    React.createElement("span", { className: "input-group" },
                                        React.createElement("div", { className: "form-control file-uploader--fake-file-input--1_ohV" }, "No file selected"),
                                        React.createElement("span", { className: "input-group-btn" },
                                            React.createElement("div", { "data-type": "button", className: "btn btn-default" }, "Upload File")))))))))),
                React.createElement("div", null)),
            " ")));
};
exports["default"] = exports.LandingPage;
