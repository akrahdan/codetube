const getClusterInterval = (duration, clusterIntervalPercentage = 2) => {
    return Math.max((clusterIntervalPercentage / 100) * duration)
  }
  
  const getClusterIntervalWithLayoutOffset = (duration, layout) => {
    if (layout === '240p') return getClusterInterval(duration, 10)
    if (layout === '360p') return getClusterInterval(duration, 8)
    if (layout === '480p') return getClusterInterval(duration, 6)
    if (layout === '720p') return getClusterInterval(duration, 4)
    return getClusterInterval(duration, 2)
  }
  
  const cluster = (markers, clusterInterval = 5) => {
    if (!markers.length) return []
  
    const clusters = [{ timeIndex: markers[0].timeIndex, markers: [] }]
    let cluster = clusters[0]
  
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i]
      if (marker.timeIndex <= cluster.timeIndex + clusterInterval) {
        cluster.markers.push(marker)
      } else {
        cluster = { timeIndex: marker.timeIndex, markers: [marker] }
        clusters.push(cluster)
      }
    }
    return clusters
  }
  
  const clusterMarkers = (markers, duration, layout) => {
    if (!markers.length) return []
  
    const sorted = markers.sort((a, b) => a.timeIndex - b.timeIndex)
    const clusterInterval = getClusterIntervalWithLayoutOffset(duration, layout)
    return cluster(sorted, clusterInterval)
  }
  
  module.exports = {
    cluster,
    getClusterInterval,
    clusterMarkers,
  }
  