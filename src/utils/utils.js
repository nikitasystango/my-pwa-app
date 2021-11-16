export const generateUniqueId = (length) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const virtualPageTracking = () => {
  window.dataLayer = window.dataLayer || []
  if(document.location.search) {
    const location = `${document.location.protocol }//${
      document.location.hostname
      }${document.location.pathname
      }${document.location.search}`
      sessionStorage.setItem('originalInitialLocation', location)
      window.dataLayer.push({ originalInitialLocation: location })
  }else{
    const location = sessionStorage.getItem('originalInitialLocation')
    window.dataLayer.push({ originalInitialLocation: location })
  }
}
