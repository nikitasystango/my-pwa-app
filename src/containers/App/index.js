import React, { Fragment, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'utils/privateRoute'
import { AppRoutes } from '../../constants/appRoutes'
import HomeContainer from 'containers/Home'
// import MapView from 'containers/MapView'
import AuthContainer from 'containers/Auth'
import ForgotPasswordContainer from 'containers/ForgotPassword'
// import FlightAvailabilityContainer from 'containers/FlightAvailability'
// import Dashboard from 'containers/Dashboard'
import Policy from 'containers/Policy'
import Blogs from 'containers/Blogs'
import BlogDetails from 'containers/BlogDetails'
import ErrorPage from 'components/ErrorPage'
import HelpCenter from 'containers/HelpCenter'
import Pages from 'containers/Pages'
import ProxyLoginComponent from 'containers/ProxyLogin'
import history from 'utils/history'
import SubscriptionThankyouPage from 'containers/SubscriptionThankyouPage'
import ProfileDetails from 'containers/ProfileDetails'

// Lazy load heavy dom components
const MapView = React.lazy(() => import('containers/MapView'))
const FlightAvailabilityContainer = React.lazy(() =>
  import('containers/FlightAvailability')
)
const Dashboard = React.lazy(() => import('containers/Dashboard'))

export default function App() {

  useEffect(() => {
    history.listen((location, action) => {
      // check for sw updates on page change
      const isNewUpdate = retrieveFromLocalStorage('isNewUpdate')
      if(isNewUpdate){
        handleCacheClear()
      }
    })
    // eslint-disable-next-line
  }, [window.location.pathname])

  function handleCacheClear() {
          caches.keys().then(function (names) {
            // delete the available cache for
            caches.delete('workbox-precache')
            caches.delete('images')
            caches.delete('api-cache')
          })
          console.log('isNewUpdateisNewUpdate');
          removeFromLocalStorage('isNewUpdate')
          window.location.reload()
  }

  return (
    <Fragment>
      <Switch>
        <Route
            exact={false}
            path="/:url*(/+)"
            render={() => (
              window.location.pathname.slice(-2) === '*/' ? (
                <Redirect to={{ pathname: window.location.pathname.slice(0, -2) }} />
              ) : window.location.pathname.slice(-1) === '/' ? (
                <Redirect to={{ pathname: window.location.pathname.slice(0, -1) }} />
              )
                : <Redirect to={{ pathname: AppRoutes.HOME }} />
            )}
        />
        <Route exact path={AppRoutes.HOME} component={HomeContainer} />
        <Route exact path={AppRoutes.DISCLAIMER} component={Policy} />
        <Route exact path={AppRoutes.TERMS_OF_USE} component={Policy} />
        <Route exact path={AppRoutes.PRIVACY_POLICY} component={Policy} />
        <Route exact path={AppRoutes.COOKIE_POLICY} component={Policy} />
        <Route exact path={AppRoutes.NEWS_AND_ADVICE} component={Blogs} />
        <Route
            exact
            path={AppRoutes.BLOG}
            render={() => (
              <Redirect to={{ pathname: AppRoutes.NEWS_AND_ADVICE }} />
            )}
        />
        <Route
            exact
            path={`${AppRoutes.NEWS_AND_ADVICE}/:slug`}
            component={BlogDetails}
        />
        <Route
            exact
            path={`${AppRoutes.BLOG_CATEGORY}/:slug`}
            component={Blogs}
        />
        <Route exact path={`${AppRoutes.TAGS}/:slug`} component={Blogs} />
        <Route exact path={AppRoutes.FAQ} component={HelpCenter} />

        {/* additional routes start*/}
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}${AppRoutes.BLOG}`}
            render={() => (
              <Redirect to={{ pathname: AppRoutes.NEWS_AND_ADVICE }} />
            )}
        />
        <Route
            exact
            path={AppRoutes.INSIDE_FLYER}
            render={() => <Redirect to={{ pathname: AppRoutes.HOME }} />}
        />
        <Route
            exact
            path={AppRoutes.HEAD_OF_POINTS}
            render={() => <Redirect to={{ pathname: AppRoutes.HOME }} />}
        />
        <Route
            exact
            path={AppRoutes.EXPLORE}
            render={() => <Redirect to={{ pathname: AppRoutes.HOME }} />}
        />
        <Route
            exact
            path={AppRoutes.FAQ_ALERTS}
            render={() => (
              <Redirect
                to={{ pathname: AppRoutes.FAQ, state: { stateName: 'alerts' } }}
              />
            )}
        />
        <Route
            exact
            path={AppRoutes.TRUST_PILOT}
            render={() => <Redirect to={{ pathname: AppRoutes.HOME }} />}
        />
        <Route
            exact
            path={AppRoutes.PRIVACY_POLICY_PDF}
            render={() => (
              <Redirect to={{ pathname: AppRoutes.PRIVACY_POLICY }} />
            )}
        />
        <Route
            exact
            path={AppRoutes.ELITE_OFFER}
            render={() => <Redirect to={{ pathname: AppRoutes.HOME }} />}
        />
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}${AppRoutes.FAQ_PAYMENT_EDIT}`}
            render={() => <Redirect to={{ pathname: AppRoutes.PRICING }} />}
        />
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}${AppRoutes.FAQ_CANCELLATION_NEW}`}
            render={() => (
              <Redirect
                to={{
                  pathname: AppRoutes.FAQ,
                  state: { stateName: 'memberships' }
                }}
              />
            )}
        />
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}/sign-in/`}
            render={() => <Redirect to={{ pathname: AppRoutes.SIGN_IN }} />}
        />
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}/sign-up/`}
            render={() => <Redirect to={{ pathname: AppRoutes.SIGN_UP }} />}
        />
        <Route
            exact
            path={`${AppRoutes.MEMBERSHIPS}${AppRoutes.FAQ}/`}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={'/vrigin-altantic-reward-flights'}
            render={() => (
              <Redirect
                to={{ pathname: AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS }}
              />
            )}
        />

        {/* additional routes end*/}

        <Route
            exact
            path={AppRoutes.HELP}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.CANCELLING_ELITE_MEMBERSHIP}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.HOW_DO_ALERT_WORKS}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.MANAGING_YOUR_ALERT}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.UPDATING_YOUR_ACCOUNT}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.UPDATING_PAYMENT_DETAILS}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.HOURLY_ALERTS}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.MEMBERSHIPS}
            render={() => <Redirect to={{ pathname: AppRoutes.PRICING }} />}
        />
        <Route
            exact
            path={AppRoutes.PRIVACY_NOTICE}
            render={() => (
              <Redirect to={{ pathname: AppRoutes.PRIVACY_POLICY }} />
            )}
        />
        <Route
            exact
            path={AppRoutes.PASSWORD_NEW}
            render={() => <Redirect to={{ pathname: AppRoutes.FAQ }} />}
        />
        <Route
            exact
            path={AppRoutes.USERS_SIGNIN}
            render={() => <Redirect to={{ pathname: AppRoutes.SIGN_IN }} />}
        />
        <Route
            exact
            path={AppRoutes.USERS_SIGNUP}
            render={() => <Redirect to={{ pathname: AppRoutes.SIGN_UP }} />}
        />

        <Route
            exact={false}
            path={`${AppRoutes.BLOGS}/:slug`}
            render={(data) =>
              data &&
              data.match &&
              data.match.params &&
              data.match.params.slug ? (
                <Redirect
                  to={{
                    pathname: `${AppRoutes.NEWS_AND_ADVICE}/${data.match.params.slug}`
                  }}
                />
              ) : (
                <Redirect to={{ pathname: AppRoutes.NEWS_AND_ADVICE }} />
              )
            }
        />

        <Route exact path={AppRoutes.THANK_YOU} component={Pages} />
        <PrivateRoute
            exact
            path={AppRoutes.BRONZE_SIGNUP_THANKYOU}
            component={Pages}
        />

        {/* Subscription thankyou  URL start */}
        <PrivateRoute
            exact
            path={AppRoutes.SILVER_FREE_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.SILVER_FREE_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.GOLD_FREE_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.GOLD_FREE_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.SILVER_PAID_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.SILVER_PAID_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.GOLD_PAID_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.GOLD_PAID_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.UPGRADE_SILVER_PAID_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.UPGRADE_SILVER_PAID_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.UPGRADE_GOLD_PAID_MONTHLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.UPGRADE_GOLD_PAID_YEARLY}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.CANCEL_SILVER_TRIAL}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.CANCEL_GOLD_TRIAL}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.DOWNGRADE_SILVER_TO_BRONZE}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.DOWNGRADE_GOLD_TO_BRONZE}
            component={SubscriptionThankyouPage}
        />
        <PrivateRoute
            exact
            path={AppRoutes.DOWNGRADE_SILVER_TO_GOLD}
            component={SubscriptionThankyouPage}
        />
        {/* Subscription thankyou  URL end */}
        <PrivateRoute
            exact
            path={AppRoutes.PROFILE_DETAILS}
            component={ProfileDetails}
        />
        <PrivateRoute
            exact
            path={AppRoutes.CANCEL_ELITE_MEMBER}
            component={Pages}
        />
        <Route exact path={AppRoutes.CAMPANION_VOUCHER} component={Pages} />
        <Route exact path={AppRoutes.VERIFY_USER} component={Pages} />
        <Route exact path={AppRoutes.HOW_IT_WORKS} component={Pages} />
        <Route exact path={AppRoutes.PRICING} component={Pages} />
        <Route exact path={AppRoutes.CHANGE_PLAN} component={Pages} />
        <Route exact path={AppRoutes.PRICING_SIGNUP} component={Pages} />
        <Route
            exact
            path={AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS}
            component={Pages}
        />
        <Route
            exact
            path={AppRoutes.AMERICAN_AIRLINE_REWARD_FLIGHTS}
            component={Pages}
        />
        <Route exact path={AppRoutes.AER_LINGUS} component={Pages} />
        <Route exact path={AppRoutes.VUELING_AIRLINES} component={Pages} />
        <Route exact path={AppRoutes.IBERIA_AIRLINES} component={Pages} />
        <Route exact path={AppRoutes.AIRFRANCE_AIRLINES} component={Pages} />
        <Route exact path={AppRoutes.KLM_AIRLINES} component={Pages} />
        <Route exact path={AppRoutes.DELTA_AIRLINES} component={Pages} />

        <PrivateRoute exact path={AppRoutes.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={AppRoutes.MY_ALERT} component={Dashboard} />
        <PrivateRoute path={AppRoutes.MEMBERSHIP} component={Dashboard} />
        <PrivateRoute
            path={AppRoutes.ACCOUNT_SETTINGS}
            component={Dashboard}
        />
        <Route exact path={AppRoutes.LOCATION} component={MapView} />
        <Route
            exact
            path={AppRoutes.PROXY_LOGIN}
            component={ProxyLoginComponent}
        />
        <Route
            exact
            path={AppRoutes.SIGN_IN}
            name="Login"
            render={(props) =>
              localStorage.getItem('token') ? (
                <Redirect to={{ pathname: '/' }} />
              ) : (
                <AuthContainer {...props} />
              )
            }
        />
        <Route
            exact
            path={AppRoutes.SIGN_UP}
            name="Register"
            render={(props) =>
              localStorage.getItem('token') ? (
                <Redirect to={{ pathname: '/' }} />
              ) : (
                <AuthContainer {...props} />
              )
            }
        />
        <Route
            exact
            path={AppRoutes.FORGET_PASSWORD}
            name="Forgot Password"
            render={(props) =>
              localStorage.getItem('token') ? (
                <Redirect to={{ pathname: '/' }} />
              ) : (
                <ForgotPasswordContainer {...props} />
              )
            }
        />
        <Route
            exact
            path={`${AppRoutes.RESET_PASSWORD}/:reset_token`}
            name="Reset Password"
            render={(props) =>
              localStorage.getItem('token') ? (
                <Redirect to={{ pathname: '/' }} />
              ) : (
                <ForgotPasswordContainer {...props} />
              )
            }
        />
        <Route
            exact
            path={AppRoutes.CALENDER}
            name="Flight Availability"
            component={FlightAvailabilityContainer}
        />
        <Route
            exact
            path={AppRoutes.PAGE_NOT_FOUND}
            name="404 Not found"
            component={ErrorPage}
        />
        <Route
            exact
            path={'/*'}
            render={() => <Redirect to={{ pathname: AppRoutes.PAGE_NOT_FOUND }} />
          }
        />
      </Switch>
    </Fragment>
  )
}
