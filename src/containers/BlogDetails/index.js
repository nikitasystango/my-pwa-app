import { connect } from 'react-redux'
import BlogDetails from 'components/BlogDetails'
import { getBlogDetails } from 'actions/BlogDetails'

const mapStateToProps = state => ({
  blogDetail: state.blogDetails.blogDetail,
  blogDetailsLoading: state.blogDetails.blogDetailsLoading
})

const mapDispatchToProps = dispatch => ({
  getBlogDetails: (slug) => dispatch(getBlogDetails(slug))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogDetails)
