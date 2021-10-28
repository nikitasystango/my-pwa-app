import { connect } from 'react-redux'
import Blogs from 'components/Blogs'
import { getBlogs, getBlogsCategories } from 'actions/Blogs'
import { pageAnalytics } from 'actions/Common'

const mapStateToProps = state => ({
  allBlogsData: state.blogs.allBlogsData,
  allBlogsLoading: state.blogs.allBlogsLoading,
  blogsCategories: state.blogs.blogsCategories,
  totalPages: state.blogs.totalPages
})

const mapDispatchToProps = dispatch => ({
  getBlogs: (data) => dispatch(getBlogs(data)),
  pageAnalytics: () => dispatch(pageAnalytics()),
  getBlogsCategories: () => dispatch(getBlogsCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blogs)
