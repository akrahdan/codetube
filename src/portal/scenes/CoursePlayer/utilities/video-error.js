export const mapHlsError = (error) => {
    if (!error) return null
    if (error.context) error.context.loader = null
    error.loader = null
    return error
  }
  
  export const mapGenericVideoError = (error) => ({
    code: error.code,
    message: error.message,
  })
  