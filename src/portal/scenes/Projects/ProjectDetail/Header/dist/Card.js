"use strict";
exports.__esModule = true;
exports.Card = void 0;
var gamut_labs_1 = require("@codecademy/gamut-labs");
var react_1 = require("react");
var Card_module_scss_1 = require("./styles/Card.module.scss");
exports.Card = function (_a) {
    var completionTime = _a.completionTime, project = _a.project;
    var included = project.included, experience = project.experience, difficulty = project.difficulty, tags = project.tags, goal = project.goal;
    // const { card_content: card = [] } = useContext(CMSContext);
    // const [includes, experienceLevel, forThoseWho] = card;
    var includesWithClass = tags.map(function (str, i, self) {
        return (react_1["default"].createElement(react_1.Fragment, { key: str },
            react_1["default"].createElement("em", { className: Card_module_scss_1["default"].highlight }, str),
            i !== self.length - 1 && ', '));
    });
    return (react_1["default"].createElement("div", { className: Card_module_scss_1["default"].card },
        react_1["default"].createElement("div", { className: Card_module_scss_1["default"].header },
            react_1["default"].createElement("span", { className: Card_module_scss_1["default"].logo },
                react_1["default"].createElement(gamut_labs_1.Logo, { type: "proAlt", height: 21 })),
            react_1["default"].createElement("span", null, completionTime)),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].title }, "Includes"),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].content }, includesWithClass),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].title }, "Experience"),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].content },
            "For the ",
            experience,
            " "),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].title }, "You will"),
        react_1["default"].createElement("ul", { className: Card_module_scss_1["default"].content }, included.map(function (item) { return (react_1["default"].createElement("li", { key: item.title }, item.title)); })),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].title }, "Goal"),
        react_1["default"].createElement("p", { className: Card_module_scss_1["default"].content }, goal)));
};
