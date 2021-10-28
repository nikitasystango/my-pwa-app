
  export const handleFingerPrintScrapper = () => {
    /* fonts stuff */
    const fontTestList = [
        'andale mono',
        'arial narrow',
        'arial unicode ms',
        'batang',
        'bell mt',
        'brush script',
        'brush script mt',
        'calibri',
        'charter',
        'courier',
        'courier new',
        'curlz mt',
        'dejavu sans',
        'dejavu sans mono',
        'dejavu serif condensed',
        'droid sans',
        'droid sans fallback',
        'droid serif',
        'forte',
        'futura',
        'geneva',
        'hei',
        'leelawadee',
        'levenim mt',
        'liberation sans',
        'liberation sans narrow',
        'marlett',
        'meiryo ui',
        'microsoft uighur',
        'microsoft yahei ui',
        'ms mincho',
        'ms ui gothic',
        'nanumgothic',
        'nirmala ui',
        'palatino',
        'papyrus',
        'pmingliu',
        'pt serif',
        'simhei',
        'stixvariants',
        'stsong',
        'traditional arabic',
        'urdu typesetting',
        'verdana',
        'wingdings',
        'wingdings 3',
        'helkevtrica'
    ]

    let canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const testString = '0-_{w.'
    context.font = '50px serif'
    const defaultSerifWidth = context.measureText(testString).width
    context.font = '50px sans-serif'
    const defaultSansSerifWidth = context.measureText(testString).width

    function hasFont(font) {
        const serifFontString = `50px "${font}", serif`
        const sansSerifFontString = `50px "${font}", sans-serif`
        context.font = serifFontString
        const hasSerifFont = context.measureText(testString).width !== defaultSerifWidth
        context.font = sansSerifFontString
        const hasSansSerifFont = context.measureText(testString).width !== defaultSansSerifWidth
        return hasSerifFont || hasSansSerifFont
    }

    const fonts = fontTestList.filter(hasFont)

    /* canvas */
    canvas.width = 300
    canvas.height = 150
    context.font = '24px Sans'
    context.textBaseline = 'top'
    context.fillText('Hel$&?6%){mZ+#@', 2, 2)
    const canvasData = { sh: canvas.toDataURL() }

    /* window/navigator/document properties */
    const windowTests = [
        'ActiveXObject',
        'ApplePaySession',
        'File',
        'MutationObserver',
        'Notification',
        'SharedWorker',
        'TouchEvent',
        'XDomainRequest',
        '_phantom',
        'attachEvent',
        'callPhantom',
        'createPopup',
        'detachEvent',
        'event',
        'external',
        'fireEvent',
        'frameElement',
        'globalStorage',
        'localStorage',
        'mozRTCPeerConnection',
        'mozRequestAnimationFrame',
        'phantom',
        'postMessage',
        'PushManager',
        'registerProtocolHandler',
        'requestAnimationFrame',
        'sessionStorage',
        'sidebar',
        'webkitRequestAnimationFrame',
        'webkitResolveLocalFileSystemURL',
        'webkitRTCPeerConnection',
        'BluetoothUUID',
        'netscape',
        '__fxdriver_unwrapped',
        '_Selenium_IDE_Recorder'
    ]
    const documentTests = [
        '_Selenium_IDE_Recorder',
        'all',
        'characterSet',
        'charset',
        'compatMode',
        'documentMode',
        'images',
        'layers',
        '$cdc_asdjflasutopfhvcZLmcfl_',
        '__fxdriver_unwrapped',
        '__webdriver_script_fn'
    ]
    const navigatorTests = [
        'vibrate',
        'webdriver',
        'credentials',
        'storage',
        'requestMediaKeySystemAccess',
        'bluetooth'
    ]

    const windowProps = windowTests.filter(key => key in window)
    const documentProps = documentTests.filter(key => key in document)
    const navigatorProps = navigatorTests.filter(key => key in navigator)


    /* screen */
    const screenInfo = {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
        screenX: window.screenX,
        screenY: window.screenY,
        isSecureContext: window.isSecureContext,
        devicePixelRatio: window.devicePixelRatio,
        height: window.screen.height,
        width: window.screen.width,
        availHeight: window.screen.availHeight,
        availWidth: window.screen.availWidth,
        pixelDepth: window.screen.pixelDepth,
        colorDepth: window.screen.colorDepth
    }

    /* navitgator info */
    const navigatorInfo = Object.fromEntries([
        'appCodeName',
        'appName',
        'appVersion',
        'buildID',
        'cpuClass',
        'hardwareConcurrency',
        'maxTouchPoints',
        'platform',
        'product',
        'productSub',
        'oscpu',
        'userAgent',
        'vendor',
        'vendorSub',
        'doNotTrack',
        'webdriver'
    ].map(key => [key, navigator[key] ?? null]))

    /* math */
    const mathProperties = Object.getOwnPropertyNames(Math)

    /* webgl */
    canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    gl.getExtension('WEBGL_debug_renderer_info')
    const glParamConstants = {
        ALIASED_LINE_WIDTH_RANGE: 33902,
        ALIASED_POINT_SIZE_RANGE: 33901,
        MAX_VIEWPORT_DIMS: 3386,
        ALPHA_BITS: 3413,
        BLUE_BITS: 3412,
        GREEN_BITS: 3411,
        RED_BITS: 3410,
        DEPTH_BITS: 3414,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
        MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
        MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
        MAX_RENDERBUFFER_SIZE: 34024,
        MAX_TEXTURE_IMAGE_UNITS: 34930,
        MAX_TEXTURE_SIZE: 3379,
        MAX_VARYING_VECTORS: 36348,
        MAX_VERTEX_ATTRIBS: 34921,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
        MAX_VERTEX_UNIFORM_VECTORS: 36347,
        RENDERER: 7937,
        SHADING_LANGUAGE_VERSION: 35724,
        STENCIL_BITS: 3415,
        VENDOR: 7936,
        VERSION: 7938,
        UNMASKED_VENDOR_WEBGL: 37445,
        UNMASKED_RENDERER_WEBGL: 37446
    }
    const parameters = Object.fromEntries(
        Object.entries(glParamConstants)
            .map(([key, value]) => [key, gl.getParameter(value)])
    )
    const supportedExtensions = gl.getSupportedExtensions()
    const glInfo = { parameters: parameters, supportedExtensions: supportedExtensions }

    /* date */
    const dateString = new Date(-770172240000).toString()

    /* fingerprint */
    const fingerprint = {
        fonts: fonts,
        canvasData: canvasData,
        historyLength: window.history.length,
        windowProps: windowProps,
        documentProps: documentProps,
        navigatorProps: navigatorProps,
        screenInfo: screenInfo,
        navigatorInfo: navigatorInfo,
        mathProperties: mathProperties,
        glInfo: glInfo,
        dateString: dateString
    }

    const oldAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    const customAlphabet = 'XUOQiWM4JuVG5D=gnYSr290NKqR7x+esPjdczZBvHE3yam6pkT/LI1wF8ofhlCtbA'
    const charMap = new Map(oldAlphabet.split('').map((c, i) => [c, customAlphabet[i]]))

    const encodedFp = btoa(JSON.stringify(fingerprint)).split('').map(c => charMap.get(c)).join('')
    return encodedFp
  }
