import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { Grid, Container } from 'semantic-ui-react'
import { Section, SectionTitle, SectionDescription } from '../Auth/style.js'
import UpdateUserDetailModal from 'common/UpdateUserDetailModal/index.js'
import { navigateToRespectivePage } from 'utils/helpers.js'
import { AppRoutes } from 'constants/appRoutes.js'
import Loader from 'components/LoadingSpinner'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages.js'
import profileDetailsMessages from 'constants/messages/profileDetailsMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import './style.scss'

const ProfileDetails = (props) => {
  const {
    user,
    updateUserName,
    userRegisterConfirmation,
    updateReducerState,
    updateUserNameLoading,
    getProfileDetails,
    getSouDesLocations,
    getSouDesPossibleRoutes,
    searchPanel,
    accountSettings: { fetchingProfileDetails },
    dashboard,
    getCountriesList
  } = props

  const appendParams = sessionStorage.getItem('queryParamsGA')
  const token = retrieveFromLocalStorage('token')
  const userId = retrieveFromLocalStorage('userId')

  useEffect(() => {
    if (token && userId) {
      getProfileDetails(userId)
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token && user && user.email) {
      const {
        firstName,
        lastName,
        address,
        country,
        ageBand,
        flightsTakenAnnually,
        travellingAbroad
      } = user || {}
      if (
        user &&
        (!firstName ||
          !lastName ||
          !country ||
          !address?.address1 ||
          !address?.city ||
          !address?.zip ||
          !ageBand ||
          !flightsTakenAnnually ||
          !travellingAbroad
          )
      ) {
        return
      } else {
         navigateToRespectivePage(AppRoutes.HOME, appendParams)
      }
    }
    // eslint-disable-next-line
  }, [user?.email]);

  return (
    <>
      {fetchingProfileDetails ? (
        <Loader />
      ) : (
        <div className="signin-signup-wrapper update-profile-wrapper">
          <Container className="signin-signup">
            <Grid className="m-0">
              <Grid.Row className="signin-signup__header update-profile-content-wrap">
                <Grid.Column tablet={16} computer={6}>
                  <Section>
                    <SectionTitle>
                      {retrieveFromLocalStorage('firstTimeSignup')
                      ? intl(dashboardMessages.accountSettingMyProfile)
                        : intl(commonMessages.updateProfileDetails)}
                    </SectionTitle>
                    <SectionDescription>
                      {intl(profileDetailsMessages.fillInformation)}
                    </SectionDescription>
                  </Section>
                </Grid.Column>
                <Grid.Column tablet={16} computer={9} className="profile-details-wrap">
                  <div>
                    <UpdateUserDetailModal
                      updateReducerState={updateReducerState}
                      updateUserName={updateUserName}
                      updateUserNameLoading={updateUserNameLoading}
                      getSouDesLocations={getSouDesLocations}
                      getSouDesPossibleRoutes={getSouDesPossibleRoutes}
                      searchPanel={searchPanel}
                      userDetails={user || {}}
                      userId={user && user.id ? user.id : userId}
                      dashboard={dashboard}
                      getCountriesList={getCountriesList}
                      userRegisterConfirmation={userRegisterConfirmation}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      )}
    </>
  )
}

ProfileDetails.propTypes = {
  user: PropTypes.object,
  updateReducerState: PropTypes.func,
  updateUserName: PropTypes.func,
  userRegisterConfirmation: PropTypes.bool,
  updateUserNameLoading: PropTypes.bool,
  getProfileDetails: PropTypes.func,
  getSouDesLocations: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func,
  searchPanel: PropTypes.object,
  accountSettings: PropTypes.object,
  dashboard: PropTypes.object,
  getCountriesList: PropTypes.func
}

export default ProfileDetails
