export function getClipProgressFromLocalStorage() {
    const clipProgress = localStorage.getItem('ps-embeddable-player-clip-progress') || '[]'
    return JSON.parse(clipProgress)
}

export function getClipProgressById(clipProgress, clipId) {
    return clipProgress && clipProgress.find(clipProg => clipProg.clipId === clipId)?.videoSecondsWatched || 0
}

function isNearEnd(videoSecondsWatched, clipDuration) {
    return clipDuration - videoSecondsWatched <= 5
}

export function buildClipProgress(oldClipProgress, newClipProgress, duration) {
    const clipProgress = oldClipProgress.filter(clipProg => clipProg.clipId !== newClipProgress.clipId)
    if (!isNearEnd(newClipProgress.videoSecondsWatched, duration)) {
        clipProgress.push(newClipProgress)
    }

    while (clipProgress.length > 50) clipProgress.shift()
    return clipProgress
}

export function setClipProgress(newClipProgress) {
    localStorage.setItem('ps-embeddable-player-clip-progress', JSON.stringify(newClipProgress))
}