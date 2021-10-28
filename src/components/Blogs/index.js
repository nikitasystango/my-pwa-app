import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Grid, GridRow, GridColumn, Button, Pagination } from 'semantic-ui-react'
import Layout from 'containers/Layout'
import { BlogsPlaceholder } from 'common/Placeholder'
import './blogs.scss'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { BlogBox, BlogBoxInner, BlogImage, BlogMedia, BlogAuthor, BlogDummyImage, BlogDummyImg, BlogAuthorImg, BlogTitle, BlogAuthorName } from '../../common/RecentBlogs/style'
import { blogSnippet } from 'constants/seoScriptConstants'
import { checkImageFormateIsWebp, extractURLParams } from 'utils/helpers'
import { BlogDummyImageSvg } from 'utils/svgs'
import history from 'utils/history'
import { GoogleAdsParam } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import ProgressiveImage from 'utils/progressiveImage'


const Blogs = (props) => {
  const { pageAnalytics, getBlogsCategories, blogsCategories,
    blogsCategoriesLoading, allBlogsData, getBlogs, allBlogsLoading, totalPages,
    match, location } = props

  const [activePage, setActivePage] = useState(1)
  const [categorie, setCategorie] = useState(null)
  const splitLocation = location && location.pathname ?location.pathname.split('/') : []
  const type = splitLocation && splitLocation.length && splitLocation[1] && splitLocation[1] === 'news-and-advice' ? 'blogs': 'tags'
  useEffect(() => {
    pageAnalytics()
   if (location?.search) {
    const data = extractURLParams(location.search)
    const arrData = Object.keys(data)
       const isExist = GoogleAdsParam.includes(arrData[0])
        if(!isExist) {
          history.push(AppRoutes.PAGE_NOT_FOUND)
        }
    }
    if (match?.params?.slug) {
      let data
      if(type === 'blogs') {
        getBlogsCategories()
      // eslint-disable-next-line prefer-destructuring
      const temp = blogsCategories.filter(e => e.slug === match.params.slug)[0]
         data = {
          type,
          category: temp && temp.id ? temp.id : null
        }
      }else{
         data = {
          type, tagsSlug: match.params.slug
        }
      }
      getBlogs(data)
    } else {
      getBlogsCategories()
      const type = 'blogs'
      const data = {
        type
      }
      getBlogs(data)
      setActivePage(1)
    }
    // eslint-disable-next-line
  }, [match])

  useEffect(()=>{
    const matchSlug = match.params.slug ? match.params.slug : 'all'
    // eslint-disable-next-line prefer-destructuring
    const temp = blogsCategories.filter(e => e.slug === matchSlug)[0]
    if(temp && temp.id) {
      fetchBlogs(temp.id)
    }
    // eslint-disable-next-line
  }, [blogsCategories])

  const fetchBlogs = (id) => {
    const type = 'blogs'
    const data = {
     type,
     category: id
   }
   getBlogs(data)
   setCategorie(id ? id : null)
  }

  const singleBlock = (slug) => {
    var win = window.open(`${AppRoutes.NEWS_AND_ADVICE}/${slug}`, '_blank')
    win.focus()
  }

  const selectCategorie = (item) => {
    setActivePage(1)
    if (categorie === item.id) {
      const type = 'blogs'
      const data = {
        type
      }
      getBlogs(data)
      setCategorie(null)
      } else { 
      fetchBlogs(item.id)
      if(item.slug !== 'all') {
        history.push(`${AppRoutes.BLOG_CATEGORY}/${item.slug}`)
      }else{
        history.push(AppRoutes.NEWS_AND_ADVICE)
      }
    }
  }

  const onPageChange = (e, dataValue) => {
    const blogCount = dataValue.activePage
    let data = {
      type, blogCount: blogCount - 1, category: categorie
    }
    if (match?.params?.slug && (type === 'tags')) {
      data = {
        type: 'tags', blogCount: blogCount - 1, tagsSlug: match.params.slug
      }
    }
    setActivePage(blogCount)
    getBlogs(data)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Layout>
      {match?.params?.slug && (type === 'tags')
        ?
          <Helmet>
            <title>{SeoTexts.TAGS_TITLE}</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
        :
          <SeoTags
          title={SeoTexts.BLOG_TITLE}
          metaDescription={SeoTexts.BLOG_DESCRIPTION}
          canonicalLink={SeoTexts.BLOG_CANONICAL}
          ogImgUrl={SeoTexts.BLOG_OG_IMAGE_URL}
          twitterImgUrl={SeoTexts.BLOG_TWITTER_IMAGE_URL}
          richSnippet={blogSnippet}
          />}
      <div className="blog-page">
        <div className="blog-page__header">
          <Grid doubling stackable columns={1} className="m-0">
            <GridRow columns={1} className="m-0">
              <GridColumn>
                <h1 className="blog-page__title">{intl(commonMessages.blog)}</h1>
                <div className="blog-page__filter">
                  {
                    !blogsCategoriesLoading &&
                    blogsCategories.map((item) => (
                      <Button key={item.id} onClick={() => selectCategorie(item)} className={`btn blog-page__filter-btn ${categorie === item.id ? 'is-active' : ''}`}>{item.name}</Button>
                    )
                    )
                  }
                </div>
              </GridColumn>
            </GridRow>
          </Grid>
        </div>
        <div className="blog-page__body">
          <Grid doubling stackable columns={3} className="m-0">
            <GridRow>
              {allBlogsLoading ?
                <BlogsPlaceholder value={6} />
                :
                allBlogsData && allBlogsData.map((value, index) => {
                  const { slug, title, author, created_at: date, image } = value || ''
                  const webpImage = checkImageFormateIsWebp(image?.url)
                  const authorAvatarWebpImage = checkImageFormateIsWebp(author?.image?.url)
                  return (
                    <GridColumn key={index} onClick={() => singleBlock(slug)}>
                      <BlogBox>
                        <BlogBoxInner>
                          <BlogMedia>
                            {image?.url ?
                              <picture>
                                <source data-srcSet={webpImage} type="image/webp" className="lazyload" />
                                <ProgressiveImage
                                  preview={image?.formats?.thumbnail?.url}
                                  image={image.url}
                                  render={(currentImage, loading) => <BlogImage
                                    style={{
                                      transition: '0.5s filter linear',
                                      filter: `${loading ? 'blur(50px)' : ''}`
                                    }}
                                    src={currentImage}
                                    alt={`blog-image-${index}`}
                                    className="lazyload"
                                    width="287"
                                    height="108"
                                    loading="lazy"
                                    />}
                                />
                              </picture>
                              :
                              <BlogDummyImage>
                                <BlogDummyImageSvg />
                              </BlogDummyImage>
                            }
                          </BlogMedia>
                          <BlogTitle>{title && title.length > 75 ? `${title.substr(0, 75)}...` : title}</BlogTitle>
                          <BlogAuthor>
                            {author?.image?.url ?
                              <picture>
                                <source data-srcSet={authorAvatarWebpImage} type="image/webp" />
                                <ProgressiveImage
                                preview={author?.image?.formats?.thumbnail?.url}
                                image={author.image.url}
                                render={(currentImage, loading) => (
                                  (
                                    <BlogAuthorImg
                                      style={{
                                        transition: '0.5s filter linear',
                                        filter: `${loading ? 'blur(50px)' : ''}`
                                      }}
                                      src={currentImage}
                                      alt="👤"
                                      className="lazyload"
                                      width="33"
                                      height="33"
                                      loading="lazy"
                                    />
                                  )
                                )}
                              />
                              </picture>
                              :
                              <BlogDummyImg alt="👤" />
                            }

                          </BlogAuthor>
                          <BlogAuthorName>{`${author?.username} ${moment(date).format('DD MMM YYYY')}`}</BlogAuthorName>
                        </BlogBoxInner>
                      </BlogBox>
                    </GridColumn>
                  )
                })
              }
            </GridRow>
          </Grid>
        </div>
      </div>
      {totalPages > 1 && !allBlogsLoading &&
        <div className="text-center" >
          <Pagination
            // defaultActivePage={1}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      }
    </Layout>
  )
}

Blogs.propTypes = {
  allBlogsData: PropTypes.array,
  allBlogsLoading: PropTypes.bool,
  getBlogs: PropTypes.func,
  pageAnalytics: PropTypes.func,
  getBlogsCategories: PropTypes.func,
  blogsCategories: PropTypes.array,
  blogsCategoriesLoading: PropTypes.bool,
  totalPages: PropTypes.number,
  match: PropTypes.object,
  location: PropTypes.object
}

export default Blogs
