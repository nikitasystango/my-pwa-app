import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { MapMarkerCircle } from '../../utils/svgs'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import './assets/scss/mapBox.scss'
import { navigateToRespectivePage } from 'utils/helpers'

const MapBox = (props) => {
  const { mapPageUrl, mapBoxTitle, mapBoxContent } = props
  const appendParams = sessionStorage.getItem('queryParamsGA')

  return (
    <div className="map-box">
      <div className="map-box__inner">
        <div className="map-box__dialog">
          <MapMarkerCircle className="map-box__dialog-icon" />
          <div className="map-box__dialog-inner">
            <h3 className="map-box__dialog-tilte">{mapBoxTitle}</h3>
            <p className="map-box__dialog-text">{mapBoxContent}</p>
            <Button className="btn btn--medium-blue map-box__dialog-button"
             onClick={() => {
              const searchParam = mapPageUrl ? `${mapPageUrl}${appendParams ? appendParams.replace('?', '&'): ''}` : appendParams
              navigateToRespectivePage(AppRoutes.LOCATION, searchParam)
             }
            }
            >
              {intl(commonMessages.explore)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
MapBox.propTypes = {
  mapPageUrl: PropTypes.string,
  mapBoxTitle: PropTypes.string,
  mapBoxContent: PropTypes.string
}

export default React.memo(MapBox)
