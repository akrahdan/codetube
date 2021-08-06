"use strict";
exports.__esModule = true;
exports.useContainerProgress = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
/* useContainerProgress requires profile userData */
exports.useContainerProgress = function (id, type) {
    var dispatch = react_redux_1.useDispatch();
    var profileId = react_redux_1.useSelector(selectUserProfileId);
    var containerProgressType = type === 'path' ? 'paths' : 'tracks';
    react_1.useEffect(function () {
        var fetchProgress = function () {
            dispatch(containerProgressRequested(containerProgressType, id, profileId));
        };
        fetchProgress();
    }, [id, containerProgressType, profileId, dispatch]);
    var containerProgress = useSelectorWith(selectContainerProgress, {
        type: containerProgressType,
        id: id
    });
    return containerProgress;
};
