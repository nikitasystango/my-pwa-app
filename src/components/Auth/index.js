import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import { Grid, Container } from 'semantic-ui-react'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import ReactHtmlParser from 'react-html-parser'
import Loader from 'components/LoadingSpinner'
import { Section, SectionTitle, SectionDescription } from './style'
import { AppRoutes } from 'constants/appRoutes'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/input.min.css'
import './auth.scss'

const AuthComponent = (props) => {

  const { pageContentDetails, pageContentLoading } = props

  const pathType = props.match.path === AppRoutes.SIGN_IN ? 'sign-in' : 'sign-up'
  const handleSignIn = (data) => {
    const { login } = props
    login(data)
  }

  const handleRegister = (data) => {
    const { signup } = props
    signup(data)
  }
  const { login_title, login_subtitle, signup_title, singup_subtitle } = pageContentDetails?.auth?.acf || ''

  return (
    <React.Fragment>
      <Layout className="signin-signup-wrapper">
        {pageContentLoading && <Loader />}
        <Container className="signin-signup">
          <Grid className="m-0">
            <Grid.Row className="signin-signup__header">
              <Grid.Column tablet={16} computer={8}>
                <Section>
                  <SectionTitle>
                    {pathType === 'sign-in' ?
                      login_title
                      :
                      signup_title
                    }
                    </SectionTitle>
                    {/* <br /><span >We’re aware some customers are having issues logging in to their account. We aim to fix this in the next 24 hours. Sorry for the inconvenience.</span> */}
                  <SectionDescription>
                    {pathType === 'sign-in' ?
                      login_subtitle && ReactHtmlParser(login_subtitle)
                      :
                      singup_subtitle && ReactHtmlParser(singup_subtitle)
                    }
                  </SectionDescription>
                </Section>
              </Grid.Column>
              <Grid.Column tablet={16} computer={8}>
                {pathType === 'sign-in' ?
                  <LoginForm {...props} handleSignIn={handleSignIn} />
                  :
                  <RegisterForm {...props} handleRegister={handleRegister} />
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    </React.Fragment>
  )
}

AuthComponent.propTypes = {
  match: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func,
  pageContentDetails: PropTypes.object,
  pageContentLoading: PropTypes.bool
}

export default AuthComponent
