import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import history from 'utils/history'
import { MapMarkerCircle } from '../../utils/svgs'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import './assets/scss/mapBox.scss'

const MapBox = (props) => {
  const { mapPageUrl, mapBoxTitle, mapBoxContent } = props
  return (
    <div className="map-box">
      <div className="map-box__inner">
        <div className="map-box__dialog">
          <MapMarkerCircle className="map-box__dialog-icon" />
          <div className="map-box__dialog-inner">
            <p className="map-box__dialog-tilte">{mapBoxTitle}</p>
            <p className="map-box__dialog-text">{mapBoxContent}</p>
            <Button className="btn btn--medium-blue map-box__dialog-button" onClick={() => history.push(mapPageUrl ? mapPageUrl : AppRoutes.LOCATION)}>{intl(commonMessages.explore)}</Button>
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
