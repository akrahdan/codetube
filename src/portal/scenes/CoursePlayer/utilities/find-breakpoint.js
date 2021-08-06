const breakpoints = [[120, 160], [240, 427], [360, 640], [480, 854], [720, 1280], [1080, 1920]]

export function findBreakpoint({ width, height }) {
  let i = breakpoints.length - 1
  let breakpoint = { height: breakpoints[0][0], width: breakpoints[0][1] }

  while (i--) {
    let [h, w] = breakpoints[i]
    let [largerH, largerW] = breakpoints[i + 1]

    if (h < height && w < width) {
      breakpoint = { height: largerH, width: largerW }
      break
    }
  }
  return breakpoint
}
