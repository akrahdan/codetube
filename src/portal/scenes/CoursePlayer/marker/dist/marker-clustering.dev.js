"use strict";

var getClusterInterval = function getClusterInterval(duration) {
  var clusterIntervalPercentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return Math.max(clusterIntervalPercentage / 100 * duration);
};

var getClusterIntervalWithLayoutOffset = function getClusterIntervalWithLayoutOffset(duration, layout) {
  if (layout === '240p') return getClusterInterval(duration, 10);
  if (layout === '360p') return getClusterInterval(duration, 8);
  if (layout === '480p') return getClusterInterval(duration, 6);
  if (layout === '720p') return getClusterInterval(duration, 4);
  return getClusterInterval(duration, 2);
};

var cluster = function cluster(markers) {
  var clusterInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  if (!markers.length) return [];
  var clusters = [{
    timeIndex: markers[0].timeIndex,
    markers: []
  }];
  var cluster = clusters[0];

  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];

    if (marker.timeIndex <= cluster.timeIndex + clusterInterval) {
      cluster.markers.push(marker);
    } else {
      cluster = {
        timeIndex: marker.timeIndex,
        markers: [marker]
      };
      clusters.push(cluster);
    }
  }

  return clusters;
};

var clusterMarkers = function clusterMarkers(markers, duration, layout) {
  if (!markers.length) return [];
  var sorted = markers.sort(function (a, b) {
    return a.timeIndex - b.timeIndex;
  });
  var clusterInterval = getClusterIntervalWithLayoutOffset(duration, layout);
  return cluster(sorted, clusterInterval);
};

module.exports = {
  cluster: cluster,
  getClusterInterval: getClusterInterval,
  clusterMarkers: clusterMarkers
};