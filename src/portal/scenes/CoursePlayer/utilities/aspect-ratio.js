export function calculateAspectRatioWidth(height) {
    return Math.ceil(16 / 9 * height)
  }
  
  export function calculateAspectRatioHeight(width) {
    return Math.ceil(width / 16 * 9)
  }
  
  export function calculateAspectRatio({ width, height }) {
    let size = { height, width }
  
    if (height >= width) {
      size.height = calculateAspectRatioHeight(width)
      size.width = width
    } else {
      size.height = height
      size.width = calculateAspectRatioWidth(height)
  
      // Calculated width will overflow the container, calculate again
      if (size.width > width) {
        size.width = width
        size.height = calculateAspectRatioHeight(size.width)
      }
    }
  
    return size
  }
  