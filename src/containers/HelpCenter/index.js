import { connect } from 'react-redux'
import HelpCenter from 'components/HelpCenter'
import { getFAQ, getFAQCategories } from 'actions/Faq'

const mapStateToProps = state => ({
  user: state.auth.user,
  faqData: state.faq.faqData,
  faqCategories: state.faq.faqCategories,
  faqLoading: state.faq.faqLoading,
  faqCategoryLoading: state.faq.faqCategoryLoading
})
const mapDispatchToProps = dispatch => ({
  getFAQ: (data) => dispatch(getFAQ(data)),
  getFAQCategories: () => dispatch(getFAQCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpCenter)
