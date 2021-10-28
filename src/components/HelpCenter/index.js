import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import { Tab, Grid } from 'semantic-ui-react'
import GeneralHelp from './generalHelp'
import SeoTags from 'common/SeoTags'
import {
  removeFromLocalStorage,
  retrieveFromLocalStorage,
  extractURLParams
} from 'utils/helpers'
import SeoTexts from 'constants/seoConstants'
import history from 'utils/history'
import intl from 'utils/intlMessage'
import helpCenterMessages from 'constants/messages/helpCenterMessages'
import { faqSnippet } from 'constants/seoScriptConstants'
import { GoogleAdsParam } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import 'semantic-ui-css/components/tab.min.css'
import 'semantic-ui-css/components/accordion.min.css'
import 'semantic-ui-css/components/menu.min.css'
import './index.scss'

const HelpCenter = (props) => {
  const { location, faqCategories, faqData } = props
  const { state = {} } = location || {}
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(location.search)
      const arrData = Object.keys(data)
      const isExist = GoogleAdsParam.includes(arrData[0])
      if (!isExist) {
        if(!arrData.includes('category')) {
           history.push(AppRoutes.PAGE_NOT_FOUND)
        }
      }
    }
    props.getFAQCategories()
    props.getFAQ({ category: 1 })
    return () => {
      if (retrieveFromLocalStorage('helpCenter')) {
        removeFromLocalStorage('helpCenter')
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(location && location.search) {
      const extractedParams = extractURLParams(location.search)
      if(extractedParams && extractedParams.category) {
        props.getFAQ({ category: extractedParams.category })
      }
      setActiveIndex(parseInt(extractedParams.category) - 1)
    }
    // eslint-disable-next-line
  }, [location.search])

  useEffect(() => {
    if (state && state.stateName) {
      // eslint-disable-next-line prefer-destructuring
      const faqDetail = faqCategories.filter(
        (list) => list.slug === state.stateName
      )[0]
      if (faqDetail && faqDetail.id) {
        const url = `${AppRoutes.FAQ}?category=${faqDetail.id}`
      history.push(url)
      }
    }
    // eslint-disable-next-line
  }, [faqCategories])

  const newPane = faqCategories.map((data) => ({
    id: data.id,
    menuItem: data.title,
    // eslint-disable-next-line react/display-name
    render: () => (
      <Tab.Pane attached={false}>
        <GeneralHelp questionData={faqData} />
      </Tab.Pane>
    )
  }))

  const handleTabChanged = (e, data) => {
    props.getFAQ({ category: newPane[data.activeIndex].id })
    // eslint-disable-next-line prefer-destructuring
    const faqDetail = faqCategories.filter(
      (list) => list.id === newPane[data.activeIndex].id
    )[0]
    setActiveIndex(parseInt(faqDetail.orderNumber) - 1)
    const url = `${AppRoutes.FAQ}?category=${faqDetail.id}`
    history.push(url)
  }

  return (
    <Layout>
      <SeoTags
        title={SeoTexts.FAQ_TITLE}
        metaDescription={SeoTexts.FAQ_DESCRIPTION}
        canonicalLink={SeoTexts.FAQ_CANONICAL}
        ogImgUrl={SeoTexts.FAQ_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.FAQ_TWITTER_IMAGE_URL}
        richSnippet={faqSnippet}
      />
      <div className="help-page">
        <div className="help-page__container mx-auto">
          <div className="help-page__header">
            <h1 className="help-page__title">{intl(helpCenterMessages.frequentlyAskQuestion)}</h1>
          </div>
          <div className="help-page__body">
            <Tab
              menu={{ secondary: true, pointing: true }}
              activeIndex={activeIndex}
              onTabChange={handleTabChanged}
              panes={newPane}
              className="help-page__tabs"
            />
          </div>
          <div className="help-page__footer">
            <Grid className="m-0">
              <Grid.Row className="m-0">
                <Grid.Column
                  mobile={9}
                  tablet={8}
                  computer={8}
                  widescreen={8}
                  verticalAlign="middle"
                  className="help-page__footer-col-left"
                >
                  <h5 className="help-page__footer-text">
                    {intl(helpCenterMessages.needHelpWithSomeOneElse)}
                  </h5>
                </Grid.Column>
                <Grid.Column
                  mobile={7}
                  tablet={8}
                  computer={8}
                  widescreen={8}
                  textAlign="right"
                  className="help-page__footer-col-right"
                >
                  <a
                    href="mailto:help@rewardflightfinder.com"
                    className="btn btn--medium-blue ui button"
                  >
                    {intl(helpCenterMessages.dropAnEmail)}
                  </a>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    </Layout>
  )
}

HelpCenter.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
  getFAQCategories: PropTypes.func,
  getFAQ: PropTypes.func,
  faqCategories: PropTypes.array
}

export default HelpCenter
