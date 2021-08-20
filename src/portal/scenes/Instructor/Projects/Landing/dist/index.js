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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var react_select_1 = require("react-select");
var courses_1 = require("services/courses");
var projects_1 = require("services/projects");
var projects_2 = require("services/projects");
var selectors_1 = require("state/location/selectors");
var hooks_1 = require("store/hooks");
var courseSplice_1 = require("state/course/courseSplice");
var react_1 = require("react");
var client = require("filestack-js");
var react_autosuggest_1 = require("react-autosuggest");
var theme_1 = require("react-autosuggest/dist/theme");
var lite_1 = require("algoliasearch/lite");
var UploadProgress_1 = require("./UploadProgress");
var Editor_1 = require("portal/scenes/Instructor/Editor");
var classnames_1 = require("classnames");
var userPrompt_1 = require("../../Courses/userPrompt");
var react_alert_1 = require("react-alert");
var style_module_scss_1 = require("./style.module.scss");
var courseSplice_2 = require("state/course/courseSplice");
var projectSplice_1 = require("state/project/projectSplice");
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
                    courseSuggestions = __spreadArrays(suggestions, [{ isAddNew: true }]);
                    return [2 /*return*/, courseSuggestions];
            }
        });
    }); };
    var coursesQuery = courses_1.useFetchInstructorCoursesQuery().data;
    var createHeading = projects_2.useCreateHeadingMutation()[0];
    var editHeading = projects_2.useEditHeadingMutation()[0];
    var locationPayload = hooks_1.useAppSelector(selectors_1.selectLocationPayload);
    var locationPath = hooks_1.useAppSelector(selectors_1.selectLocationType);
    var selectedSave = hooks_1.useAppSelector(courseSplice_1.selectSave);
    var selectedProject = hooks_1.useAppSelector(projectSplice_1.selectProject);
    var selectedCourses = hooks_1.useAppSelector(courseSplice_1.selectCourses);
    var dispatch = hooks_1.useAppDispatch();
    var _a = projects_2.useFetchProjectQuery(locationPayload.id), project = _a.data, isLoading = _a.isLoading;
    var updateProject = projects_2.useUpdateProjectMutation()[0];
    var levels = courses_1.useFetchCourseLevelQuery().data;
    var categories = projects_1.useFetchProjectCategoriesQuery().data;
    var _b = react_1.useState(false), uploading = _b[0], setUploading = _b[1];
    var _c = react_1.useState(0), progress = _c[0], setProgress = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var _e = react_1.useState('Progress'), status = _e[0], setStatus = _e[1];
    var _f = react_1.useState(null), files = _f[0], setFiles = _f[1];
    var alert = react_alert_1.useAlert();
    var _g = react_1.useState(), category = _g[0], setCategory = _g[1];
    var _h = react_1.useState([]), suggestions = _h[0], setSuggestions = _h[1];
    var _j = react_1.useState(''), suggestionValue = _j[0], setSuggestionValue = _j[1];
    var _k = react_1.useState(selectedProject), projectUpdate = _k[0], setProjectUpdate = _k[1];
    var _l = react_1.useState(selectedCourses), courses = _l[0], setCourses = _l[1];
    var _m = react_1.useState(), course = _m[0], setCourse = _m[1];
    var _o = react_1.useState(selectedProject ? selectedProject.courses : []), projectCourse = _o[0], setProjectCourse = _o[1];
    var _p = react_1.useState(selectedProject ? selectedProject.tags : []), tags = _p[0], setTags = _p[1];
    var _q = react_1.useState(selectedProject ? selectedProject.header : {
        heading: '',
        description: '',
        id: null,
        projects: []
    }), header = _q[0], setHeader = _q[1];
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
                setProjectUpdate(__assign(__assign({}, projectUpdate), { thumbnail_url: results.url }));
            })["catch"](function (err) {
                setStatus('Failed');
                console.log(err);
                setError(err.status);
            });
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        setProjectCourse(selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.courses);
    }, [selectedProject]);
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
        if (selectedSave.locationPath == locationPath) {
            if (header) {
                if (selectedProject.header) {
                    editHeading(__assign(__assign({}, header), { projects: [projectUpdate.id] })).then(function (res) {
                        var _a, _b, _c;
                        var header = projectUpdate.header, body = __rest(projectUpdate, ["header"]);
                        updateProject(__assign(__assign({}, body), { tags: tags, syllabuses: (_a = body === null || body === void 0 ? void 0 : body.syllabuses) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item.id; }), included: (_b = body.included) === null || _b === void 0 ? void 0 : _b.map(function (item) { return item === null || item === void 0 ? void 0 : item.id; }), outcomes: (_c = body.outcomes) === null || _c === void 0 ? void 0 : _c.map(function (item) { return item === null || item === void 0 ? void 0 : item.id; }), courses: projectCourse.map(function (item) { return Number(item.id); }) })).then(function (res) {
                            if (res.data && res.data.id) {
                                alert.show("Your changes have been saved successfully");
                                setProjectUpdate(res.data);
                                dispatch(courseSplice_2.saveCourse({
                                    submit: false,
                                    locationPath: null
                                }));
                            }
                        })["catch"](function (err) {
                            alert.error(err);
                            dispatch(courseSplice_2.saveCourse({
                                submit: false,
                                locationPath: null
                            }));
                        });
                    });
                }
                else {
                    createHeading({
                        heading: header.heading,
                        description: header.description,
                        projects: [projectUpdate.id]
                    }).then(function (res) {
                        var _a, _b, _c;
                        var header = projectUpdate.header, body = __rest(projectUpdate, ["header"]);
                        updateProject(__assign(__assign({}, body), { tags: tags, syllabuses: (_a = body === null || body === void 0 ? void 0 : body.syllabuses) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item.id; }), included: (_b = body.included) === null || _b === void 0 ? void 0 : _b.map(function (item) { return item === null || item === void 0 ? void 0 : item.id; }), outcomes: (_c = body.outcomes) === null || _c === void 0 ? void 0 : _c.map(function (item) { return item === null || item === void 0 ? void 0 : item.id; }), courses: projectCourse.map(function (item) { return Number(item.id); }) })).then(function (res) {
                            if (res.data && res.data.id) {
                                alert.show("Your changes have been saved successfully");
                                setProjectUpdate(res.data);
                                dispatch(courseSplice_2.saveCourse({
                                    submit: false,
                                    locationPath: null
                                }));
                            }
                        })["catch"](function (err) {
                            alert.error(err);
                            dispatch(courseSplice_2.saveCourse({
                                submit: false,
                                locationPath: null
                            }));
                        });
                    });
                }
            }
        }
    }, [selectedSave]);
    react_1.useEffect(function () {
        setProjectUpdate(selectedProject);
        setTags(selectedProject ? selectedProject.tags : []);
        setHeader(selectedProject ? selectedProject.header : null);
        var cat = selectedProject && selectedProject.category;
        var newCat = categories && categories.find(function (item) { return item.id == cat; });
        if (newCat) {
            setCategory(newCat);
        }
    }, [selectedProject]);
    react_1.useEffect(function () {
        setCourses(selectedCourses);
    }, [selectedCourses]);
    if (isLoading || !projectUpdate) {
        return (React.createElement("div", { className: "ud-app-loader" },
            React.createElement("div", { className: "sub-header--wrapper--3Vunm" },
                React.createElement("div", { className: "sub-header--main-content--22it3" },
                    React.createElement("h2", { "data-purpose": "page-title", className: "font-heading-serif-xl sub-header--title--2VD8q" }, "Project landing page"))),
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
                React.createElement("h2", { "data-purpose": "page-title", className: "font-heading-serif-xl sub-header--title--2VD8q" }, "Project landing page"))),
        React.createElement("div", { className: "main-content--wrap_component--2TEkz" },
            React.createElement("form", null,
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "title", className: "control-label" }, "Project title"),
                    React.createElement("div", { className: "form-control-counter-container" },
                        React.createElement("input", { placeholder: "Insert your course title.", name: "title", "data-purpose": "edit-course-title", maxLength: 60, value: projectUpdate.title, onChange: function (event) { return setProjectUpdate(__assign(__assign({}, projectUpdate), { title: event.target.value })); }, id: "title", className: "form-control" }),
                        React.createElement("div", { className: "form-control-counter", "data-purpose": "form-control-counter" }, projectUpdate.title ? projectUpdate.title.length : null))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "headline", className: "control-label" }, "Project header heading"),
                    React.createElement("div", { className: "form-control-counter-container" },
                        React.createElement("input", { placeholder: "Insert your course subtitle.", name: "headline", value: header ? header.heading ? header.heading : '' : '', onChange: function (event) { return setHeader(__assign(__assign({}, header), { heading: event.target.value })); }, maxLength: 120, id: "headline", className: "form-control" }),
                        React.createElement("div", { className: "form-control-counter", "data-purpose": "form-control-counter" }, header ? header.heading ? header.heading.length : null : null))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "description", className: "control-label" }, "Project header description"),
                    React.createElement(Editor_1.RTEditor, { editorValue: header ? header.description : '', handleChange: function (value) {
                            return setHeader(__assign(__assign({}, header), { description: value }));
                        } })),
                React.createElement("div", null,
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "description", className: "control-label" }, "Project description"),
                        React.createElement(Editor_1.RTEditor, { editorValue: projectUpdate ? projectUpdate.description : '', handleChange: function (value) {
                                return setProjectUpdate(__assign(__assign({}, projectUpdate), { description: value }));
                            } })),
                    React.createElement("div", null,
                        React.createElement("p", null, "Basic info"),
                        React.createElement("div", { className: "course-basics-form--inline-fields--3ZuU2" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { htmlFor: "instructional_level", className: "sr-only control-label" }, "Project instructional level"),
                                React.createElement("div", { className: "form-control-single-select-container" },
                                    React.createElement("select", { title: "Instructional level", id: "instructional_level", className: "form-control", value: projectUpdate.level || -1, onChange: function (event) { return setProjectUpdate(__assign(__assign({}, projectUpdate), { level: event.target.value })); } },
                                        React.createElement("option", { value: -1 }, "-- Select Level --"),
                                        levels && levels.map(function (level) { return React.createElement("option", { key: level.name, value: level.name }, level.display); })))),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { htmlFor: "category", className: "sr-only control-label" }, "Project category"),
                                React.createElement("div", { className: "form-control-single-select-container" },
                                    React.createElement("select", { title: "Category", id: "category", value: projectUpdate.category || -1, onChange: function (event) {
                                            var newCat = categories && categories.find(function (cat) { return cat.id == Number(event.target.value); });
                                            if (newCat)
                                                setProjectUpdate(__assign(__assign({}, projectUpdate), { category: newCat.id }));
                                            setCategory(newCat);
                                        }, className: "form-control" },
                                        React.createElement("option", { value: -1 }, "-- Select Category --"),
                                        categories && categories.map(function (category) { return React.createElement("option", { key: category.id, value: category.id }, category.title); }))))),
                        React.createElement("p", null, "Select Courses for this project"),
                        React.createElement("div", { className: "course-basics-form--inline-fields--3ZuU2" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { htmlFor: "courses", className: "sr-only control-label" }, "Project courses"),
                                React.createElement(react_select_1["default"], { closeMenuOnSelect: false, onChange: function (value) {
                                        console.log(value);
                                        value && setProjectCourse(value);
                                    }, value: projectCourse, getOptionLabel: function (options) { return options.title; }, getOptionValue: function (options) { return options.id.toString(); }, isMulti: true, options: courses }))),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { htmlFor: "headline", className: "control-label" }, "Let your students know the overall goal of this project"),
                            React.createElement("div", { className: "form-control-counter-container" },
                                React.createElement("input", { placeholder: "Insert your course subtitle.", name: "headline", value: projectUpdate.goal || '', onChange: function (event) { return setProjectUpdate(__assign(__assign({}, projectUpdate), { goal: event.target.value })); }, maxLength: 120, id: "headline", className: "form-control" }),
                                React.createElement("div", { className: "form-control-counter", "data-purpose": "form-control-counter" }, projectUpdate.goal ? projectUpdate.goal.length : null))),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("div", { className: "label-manager--sublabel--kpb1O" },
                                        React.createElement("span", { "data-purpose": "safely-set-inner-html:label-manager:what-is-taught" },
                                            "What is ",
                                            React.createElement("strong", null, "primarily"),
                                            " taught in your project?"),
                                        React.createElement("span", { className: "label-manager--tooltip-icon--15XkO overlay-with-pointer cfi cfi-info-circle" }))),
                                React.createElement("div", { className: "m0 row" },
                                    React.createElement("div", { className: "col-sm-6 pl0 pr0" },
                                        React.createElement("span", { className: "course-labels--course-labels--gbBja" }, tags && tags.map(function (tag) { return (React.createElement(React.Fragment, null,
                                            React.createElement("span", { key: tag, className: "course-labels--course-label--1Vi_C label label-default" },
                                                React.createElement("span", null, tag),
                                                React.createElement("span", { className: "cfi cfi-close course-labels--course-label__icon--cBTbb", role: "button", tabIndex: 0 })))); })),
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
                                        React.createElement("img", { alt: "Course image", src: projectUpdate.thumbnail_url ? projectUpdate.thumbnail_url : "https://s.udemycdn.com/course/750x422/placeholder.jpg" })),
                                    React.createElement("div", { className: "image-upload-preview-with-crop--tips--17Lj2" })),
                                React.createElement("div", { className: "image-upload-preview-with-crop--form-element--2Nnsf" },
                                    React.createElement("div", null,
                                        React.createElement("p", null,
                                            React.createElement("span", null, "Upload your project image here. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image."))),
                                    React.createElement("div", { className: "file-uploader--file-selector--SGCns" }, uploading ? React.createElement(UploadProgress_1.UploadProgress, { progress: progress, changeUpload: function () { return setUploading(!uploading); } }) : (React.createElement(React.Fragment, null,
                                        React.createElement("input", { accept: ".gif,.jpg,.jpeg,.png", type: "file", onChange: function (event) { return onUpload(event.target.files[0], onProgress); }, id: "FileUploaderS3-0--24", className: "sr-only" }),
                                        React.createElement("label", { htmlFor: "FileUploaderS3-0--24" },
                                            React.createElement("span", { className: "input-group" },
                                                React.createElement("div", { className: "form-control file-uploader--fake-file-input--1_ohV" }, "No file selected"),
                                                React.createElement("span", { className: "input-group-btn" },
                                                    React.createElement("div", { "data-type": "button", className: "btn btn-default" }, "Upload File"))))))),
                                    React.createElement("input", { type: "hidden" }))))))))));
};
exports["default"] = exports.LandingPage;
