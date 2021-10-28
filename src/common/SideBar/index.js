import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Sidebar } from 'semantic-ui-react'
import 'semantic-ui-css/components/segment.min.css'
import 'semantic-ui-css/components/sidebar.min.css'
import './sidebar.scss'
class SidebarPanel extends Component {
  render() {
    const { isSidebarVisible, children, toggleSidebar , newProfilePicture } = this.props
    return (
      <div className="formSidebar login_sidebar">
        <div className={isSidebarVisible ? 'overley-screen' : ''} />
        <Sidebar
          as={Segment}
          animation={'overlay'}
          direction={'right'}
          icon="labeled"
          inverted
          vertical
          visible={isSidebarVisible}
          width="wide"
          className={`formSidebar__inner ${newProfilePicture?.profilePictureUploadModal ? 'popupMOdalOpen' : ''  }`}
        >
          <button onClick={toggleSidebar} className="formSidebar__close-icon-btn">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" className="closeIcon">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.5863 9.99487L18.6625 2.91193C19.102 2.47219 19.102 1.75895 18.6625 1.31922C18.2227 0.87902 17.5108 0.87902 17.0712 1.31922L9.99512 8.40245L2.91857 1.31922C2.47901 0.87902 1.76701 0.87902 1.32745 1.31922C0.88782 1.75895 0.88782 2.47219 1.32745 2.91193L8.40381 9.99487L1.32745 17.0779C0.88782 17.5181 0.88782 18.2311 1.32745 18.6711C1.54727 18.8909 1.83529 19.0011 2.12301 19.0011C2.41073 19.0011 2.69884 18.8909 2.91857 18.6711L9.99512 11.5881L17.0712 18.6711C17.291 18.8909 17.5791 19.0011 17.8668 19.0011C18.1545 19.0011 18.4426 18.8909 18.6625 18.6711C19.102 18.2311 19.102 17.5181 18.6625 17.0779L11.5863 9.99487Z" />
            </svg>
          </button>
          <div>
            {children}
          </div>
        </Sidebar>
      </div>
    )
  }
}

SidebarPanel.propTypes = {
  children: PropTypes.element,
  isSidebarVisible: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

export default SidebarPanel
