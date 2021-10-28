/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import { Button, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BlogsPlaceholder } from 'common/Placeholder'
import { getBlogs } from 'actions/Blogs'
import history from 'utils/history'
import { checkImageFormateIsWebp } from 'utils/helpers'
import {
  RecentBlogsWrap,
  BlogBox,
  BlogImage,
  BlogBoxInner,
  BlogMedia,
  BlogDummyImage,
  BlogAuthor,
  BlogDummyImg,
  BlogAuthorImg,
  BlogTitle,
  BlogAuthorName,
  SectionTitle
} from './style'
import { BlogDummyImageSvg } from 'utils/svgs'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import ProgressiveImage from 'utils/progressiveImage'

const RecentBlogs = React.memo((props) => {
  const { blogsData, getBlogs, blogsLoading, btnClass } = props

  useEffect(() => {
    if (blogsData.length === 0) {
      const type = 'others'
      const data = {
        type
      }
      getBlogs(data)
    }
    // eslint-disable-next-line
  }, [])

  const singleBlock = (slug) => {
    var win = window.open(`${AppRoutes.NEWS_AND_ADVICE}/${slug}`, '_blank')
    win.focus()
  }

  return (
    <RecentBlogsWrap>
      <div className="container">
        <SectionTitle className="recent-blogs-head">
          {intl(commonMessages.recentBlogs)}
        </SectionTitle>
        <Grid doubling stackable columns={3} className="m-0">
          <GridRow>
            {blogsLoading ? (
              <BlogsPlaceholder value={3} />
            ) : (
              blogsData.map((value, index) => {
                const { slug, title, author, created_at: date, image } =
                  value || ''
                const blogWebpImage = checkImageFormateIsWebp(image?.url)
                const authorAvatarWebpImage = checkImageFormateIsWebp(
                  author?.image?.url
                )
                return (
                  <GridColumn key={index} onClick={() => singleBlock(slug)}>
                    <BlogBox>
                      <BlogBoxInner>
                        <BlogMedia>
                          {image?.url ? (
                            <>
                              <picture>
                                <source
                                  data-srcSet={blogWebpImage}
                                  type="image/webp"
                                  className="lazyload"
                                />
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
                            </>
                          ) : (
                            <BlogDummyImage>
                              <BlogDummyImageSvg />
                            </BlogDummyImage>
                          )}
                        </BlogMedia>
                        <BlogTitle>
                          {title && title.length > 75
                            ? `${title.substr(0, 75)}...`
                            : title}
                        </BlogTitle>
                        <BlogAuthor>
                          {author?.image?.url ? (
                            <picture>
                              <source
                                data-srcSet={authorAvatarWebpImage}
                                type="image/webp"
                                className="lazyload"
                              />
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
                          ) : (
                            <BlogDummyImg alt="👤" />
                          )}
                        </BlogAuthor>
                        <BlogAuthorName>{`${author?.username} ${moment(
                          date
                        ).format('DD MMM YYYY')}`}
                        </BlogAuthorName>
                      </BlogBoxInner>
                    </BlogBox>
                  </GridColumn>
                )
              })
            )}
          </GridRow>
        </Grid>
        {blogsData.length > 0 && (
          <Grid className="m-0">
            <GridRow>
              <GridColumn textAlign="center" width="16">
                <Button
                  onClick={() => history.push(AppRoutes.NEWS_AND_ADVICE)}
                  className={`btn ${btnClass ? btnClass : 'btn--dark'}`}
                >
                  {intl(commonMessages.viewAll)}
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        )}
      </div>
    </RecentBlogsWrap>
  )
}
)
RecentBlogs.propTypes = {
  getBlogs: PropTypes.func,
  blogsData: PropTypes.array,
  blogsLoading: PropTypes.bool,
  btnClass: PropTypes.string
}

const mapDispatchToProps = (dispatch) => ({
  getBlogs: (data) => dispatch(getBlogs(data))
})

const mapStateToProps = (state) => ({
  blogsData: state.blogs.blogsData,
  blogsLoading: state.blogs.blogsLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentBlogs)
