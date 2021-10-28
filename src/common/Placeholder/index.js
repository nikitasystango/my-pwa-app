import React from 'react'
import { Grid, Placeholder } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/components/placeholder.min.css'

import { RecentBlogPlaceholder, PageHeadPlaceHolder, TestimonialPlaceholderWrapper, HowItWorksPlaceholderWrapper, SubscriptionPlaceholderWrapper } from './style'

const blogsHolder = (index) => (
  <Grid.Column key={index}>
    <RecentBlogPlaceholder className="recent-blogs-placeholder">
      <Placeholder className="recent-blogs-placeholder__image">
        <Placeholder.Image />
      </Placeholder>
      <div className="recent-blogs-placeholder__header">
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      </div>
      <div className="recent-blogs-placeholder__author-image">
        <Placeholder />
      </div>
      <div className="recent-blogs-placeholder__paragraph">
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </div>
    </RecentBlogPlaceholder>
  </Grid.Column>
)

export const TestimonialPlaceholder = ({ value }) => {
  const placeholderArray = [...new Array(value)]
  return (
    <TestimonialPlaceholderWrapper>
      <Grid columns={value} stackable className="testimonial-placeholder-wrapper">
        {placeholderArray.map((value, index) => (
          <Grid.Column key={index}>
            <div className="testimonial-placeholder">
              <Placeholder className="testimonial-placeholder__image">
                <Placeholder.Image />
              </Placeholder>
              <Placeholder className="testimonial-placeholder__paragraph">
                <Placeholder.Paragraph>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="very long" />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </div>
          </Grid.Column>
        )
        )}
      </Grid >
    </TestimonialPlaceholderWrapper>
  )
}

TestimonialPlaceholder.propTypes = {
  value: PropTypes.number
}


export const HowItWorksPlaceholder = ({ value }) => {
  const placeholderArray = [...new Array(value)]
  return (
    <HowItWorksPlaceholderWrapper>
      <Grid columns={value} stackable className="how-it-work-placeholder-wrapper">
        {placeholderArray.map((value, index) => (
          <Grid.Column key={index}>
            <Placeholder className="how-it-work-placeholder">
              <Placeholder.Image />
              <Placeholder.Header>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="long" />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
                <Placeholder.Line length="medium" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Grid.Column>
        )
        )}
      </Grid >
    </HowItWorksPlaceholderWrapper>
  )
}

HowItWorksPlaceholder.propTypes = {
  value: PropTypes.number
}

export const SubscriptionPlaceholder = () => (
  <SubscriptionPlaceholderWrapper>
    <div className="subscription-placeholder">
      <div className="subscription-placeholder__col">
        <Placeholder>
          <Placeholder.Image />
        </Placeholder>
      </div>
      <div className="subscription-placeholder__col">
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </div>
    </div>
  </SubscriptionPlaceholderWrapper>
)


export const BlogsPlaceholder = ({ value }) => {
  const placeholderArray = [...new Array(value)]
  return (
    <>
      {placeholderArray.map((value, index) => blogsHolder(index))}
    </>
  )
}

BlogsPlaceholder.propTypes = {
  value: PropTypes.number
}

export const HeaderPlaceholder = () => (
  <PageHeadPlaceHolder className="page-head-placeholder">
    <Placeholder />
    <Placeholder />
  </PageHeadPlaceHolder>
)
// eslint-disable-next-line
export default (HeaderPlaceholder, TestimonialPlaceholder, HowItWorksPlaceholder, SubscriptionPlaceholder, BlogsPlaceholder)
