import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { Grid, Image, Button } from 'semantic-ui-react'
import Layout from 'containers/Layout'
import Loader from 'components/LoadingSpinner'
import { AngleLeft } from '../../utils/svgs'
import { checkImageFormateIsWebp, navigateToRespectivePage } from 'utils/helpers'
import SeoTags from 'common/SeoTags'
import { AppRoutes } from 'constants/appRoutes'
import 'semantic-ui-css/components/image.min.css'
import './blog-details.scss'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import SeoTexts from 'constants/seoConstants'

const BlogDetails = (props) => {

  const { getBlogDetails, match, blogDetail, blogDetailsLoading } = props
  const { author, title, created_at: date, image, content, seoMetaDesc, seoTitle, tags, richSnippet, twitterTag, ogTag, slug } = (blogDetail?.length && blogDetail[0])|| ''
  const webpImage = checkImageFormateIsWebp(image?.url)
  const { type = 'WebPage', name = '' } = richSnippet ? richSnippet : {}
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    if (match?.params?.slug) {
      getBlogDetails(match.params.slug)
    } else {
      navigateToRespectivePage(AppRoutes.NEWS_AND_ADVICE, appendParams)
    }
    // eslint-disable-next-line
  }, [])

 const blogSnippet = richSnippet ? (
   <script type="application/ld+json">{`{
      "@context": "http://schema.org",
      "@type": "${type}",
      "name": "${name} | Reward Flight Finder",
      "url": "${richSnippet.url}",
      "description": "${richSnippet.description}",
      "image": "${image?.url}"
      }`}
   </script>
  ) : null

  return (
    <Layout>
      <SeoTags
          title={seoTitle ? seoTitle : 'RFF'}
          metaDescription={seoMetaDesc ? seoMetaDesc : 'RFF BLOG'}
          ogImgUrl={ogTag}
          twitterImgUrl={twitterTag}
          richSnippet={blogSnippet}
          canonicalLink={`${SeoTexts.BLOG_CANONICAL}${slug ? slug : ''}`}
      />
      {blogDetailsLoading && <Loader />}
      <div className="blog-detail-page">
        <Grid className="m-0">
          <Grid.Row className="">
            <Grid.Column width={16}>
              <button className="blog-detail-page__back-to-blog" onClick={() => navigateToRespectivePage(AppRoutes.NEWS_AND_ADVICE, appendParams)}>
                <AngleLeft />{intl(commonMessages.blog)}
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="blog-detail-page__header">
          <Grid className="m-0">
            <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <h1 className="blog-detail-page__title">{title}</h1>
                <p className="blog-detail-page__info">{author?.username} <span className="dot" /> {moment(date).format('DD MMM YYYY')}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="blog-detail-page__body">
          <Grid className="m-0">
            <Grid.Row>
              <Grid.Column width={16}>
                <div className="blog-detail-page__feature-image">
                  <picture>
                    <source srcSet={webpImage} type="image/webp" className="lazyload" />
                    <Image src={image?.url} className="lazyload" fluid />
                  </picture>
                </div>
                <div className="blog-detail-page__content">
                  {ReactHtmlParser(content)}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
      <div className="blog-detail-page__tags">
        <div className="blog-detail-page__tags_inner">
          {tags?.map((item, index) => {
            return <Button key={`tags_${index}`} onClick={() => navigateToRespectivePage(`${AppRoutes.TAGS}/${item.slug}`, appendParams)}>{item.name}</Button>
          })
          }
        </div>
      </div>
    </Layout>
  )
}

BlogDetails.propTypes = {
  getBlogDetails: PropTypes.func,
  match: PropTypes.object,
  blogDetail: PropTypes.array,
  blogDetailsLoading: PropTypes.bool,
  location: PropTypes.object
}

export default BlogDetails
