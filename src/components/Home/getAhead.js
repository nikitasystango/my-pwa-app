/* eslint-disable react/display-name */
import React from 'react'
import { SimpleSearch, InstantAlerts } from '../../utils/svgs'
import { Grid } from 'semantic-ui-react'
import intl from 'utils/intlMessage'
import staticMessage from 'constants/messages/homeMessages'
import './assets/scss/getAhead.scss'

export const GetAheadBox = ({ icon, title, description }) => (
  <div className="get-ahead-section__box">
    <div className="get-ahead-section__box-img">
      {icon}
    </div>
    <h4 className="get-ahead-section__box-title">{title}</h4>
    <p className="get-ahead-section__box-description">{description}</p>
  </div>
)

export const GetAhead = React.memo(() => (
  <div className="get-ahead-section">
    <div className="get-ahead-section__inner">
      <div className="get-ahead-section__container container">
        <h2 className="get-ahead-section__title">{intl(staticMessage.getAheadSectionTitle)}</h2>

        <Grid className="m-0">
          <Grid.Row textAlign="center" className="justify-content-center">
            <Grid.Column mobile={16} tablet={16} computer={5} widescreen={5}>
              <GetAheadBox icon={<SimpleSearch />} title={<>{intl(staticMessage.getAheadSimpleSearchOne)}<br />{intl(staticMessage.getAheadSimpleSearchTwo)}</>} description={intl(staticMessage.getAheadSimpleSearchDes)} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5} widescreen={5}>
              <GetAheadBox icon={<InstantAlerts />} title={<>{intl(staticMessage.getAheadInstantAlertOne)}<br />{intl(staticMessage.getAheadInstantAlertTwo)}</>} description={intl(staticMessage.getAheadInstantAlertDes)} />
            </Grid.Column>
            {/* <Grid.Column>
              <GetAheadBox icon={<DiscoverTravel />} title="Discover Where You Can Go on Any Travel Date" description="Use the map to view global BA reward flight availability" />
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </div>

    </div>
  </div>
))

export default GetAhead
