import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Header, Button, Transition, Form } from 'semantic-ui-react'
import { ProfilePicSelectoreSvg, Close } from 'utils/svgs'
import * as actions from '../../actions/Dashboard'
import './profile-picture-modal.scss'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import axios from 'axios'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'

const ProfilePictureModal = (props) => {
  const { uploadNewProfilePictureSuccess, getProfileDetails, uploadNewProfilePictureFailed, newProfilePicture,
    user, getPreSignedUrl, setNewProfilePicture, removeProfilePicture, profilePictureUploadModalToggle } = props
  const { uploading, removing } = newProfilePicture || ''

  useEffect(() => {
    if (newProfilePicture?.preSignedUrl?.presigned_url && newProfilePicture?.preSignedUrl?.image) {
      axios.put(newProfilePicture.preSignedUrl.presigned_url, newProfilePicture.preSignedUrl.image)
        .then(response => {
          if (response?.status === 200) {
            uploadNewProfilePictureSuccess()
            getProfileDetails(user?.id)
          }
        }).catch(error => {
          pushNotification(intl(toustifyMessages.uploadProfileImageFailed), 'error', 'TOP_CENTER', 5000)
          uploadNewProfilePictureFailed()
          removeProfilePicture('preSignedFailed')
        })
    }
    // eslint-disable-next-line
  }, [newProfilePicture.preSignedUrl])

  const handleProfileImageUpload = () => {
    if (newProfilePicture?.image) {
        const { image } = newProfilePicture
        const token = retrieveFromLocalStorage('token')
        getPreSignedUrl({ token, image })
      // }
    } else {
      pushNotification(intl(toustifyMessages.uploadProfileImageFailed), 'error', 'TOP_CENTER', 5000)
    }
  }

  const handleProfileImageChange = (event) => {
    // eslint-disable-next-line prefer-destructuring
    const file = event.target.files[0]
    if (file) {
      // eslint-disable-next-line prefer-destructuring
      const fileType = file.type.split('/')[0]
      const size = file.size / (1024 * 1024)
      if (fileType !== 'image') {
        return
      }
      if (size > 7) {
        pushNotification(intl(toustifyMessages.imageSizeLimit), 'error', 'TOP_CENTER', 5000)
        return
      }
      setNewProfilePicture(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    const { profileImage } = user
    if (newProfilePicture.image) {
      setNewProfilePicture(null)
    } else if (profileImage) {
      removeProfilePicture('')
    }
  }

  const handleModalClose = () => {
    profilePictureUploadModalToggle()
    setNewProfilePicture(null)
  }

  return (
    <Transition>
      <Modal
        onClose={handleModalClose}
        open={newProfilePicture.profilePictureUploadModal}
        closeOnDimmerClick={false}
        closeIcon={<div><Close className="cst-popup__close" /></div>}
        className="cst-popup uploadPhotoModal"
      >
        <Header content="Select Profile Photo" />
        <Modal.Content>
          {
            newProfilePicture.image ?
              <div className="custom-drop-image">
                <div className="user-image">
                  <label className="inputfile-label" htmlFor="profile-photo-1">
                    <img className="lazyload" src={URL.createObjectURL(newProfilePicture.image)} alt="profile👤" />
                  </label>
                </div>
                <input className="inputfile" type={'file'} disabled={uploading} onChange={handleProfileImageChange} multiple={false} id="profile-photo-1" accept="image/*" />
              </div>
              :
              <div className="custom-drop-image">
                <div className="user-image">
                  <label className="inputfile-label" htmlFor="profile-photo">
                    {user && user.profileImage ?
                      <img className="lazyload" src={user.profileImage} alt="profile👤" />
                      :
                      <ProfilePicSelectoreSvg />
                    }
                  </label>
                </div>
                <input className="inputfile" type={'file'} disabled={uploading} onChange={handleProfileImageChange} multiple={false} id="profile-photo" accept="image/*" />
              </div>
          }
        </Modal.Content>
        <Modal.Actions className="cst-popup__buttons mb-0 w-auto">
          <Form onSubmit={handleProfileImageUpload}>
            <Button color="grey" type="button"
              loading={removing}
              disabled={removing || uploading || (user && !user.profileImage && !newProfilePicture.image)}
              onClick={handleRemoveProfilePicture}
              className={'btn uploadPhotoModal__btn btn--dark'}
            >
              {intl(commonMessages.removePhoto)}
            </Button>
            <Button color="grey" type={'submit'}
              loading={uploading}
              disabled={uploading || removing || !newProfilePicture.image}
              className={'btn uploadPhotoModal__btn btn--medium-blue'}
            >
              {intl(commonMessages.uploadPhoto)}
            </Button>
          </Form>
        </Modal.Actions>
      </Modal>
    </Transition>
  )
}

ProfilePictureModal.propTypes = {
  newProfilePicture: PropTypes.object,
  profilePictureUploadModalToggle: PropTypes.func,
  setNewProfilePicture: PropTypes.func,
  removeProfilePicture: PropTypes.func,
  user: PropTypes.object,
  uploadNewProfilePictureSuccess: PropTypes.func,
  uploadNewProfilePictureFailed: PropTypes.func,
  getProfileDetails: PropTypes.func,
  getPreSignedUrl: PropTypes.func
}

const mapStateToProps = (state) => ({
  newProfilePicture: state.dashboard.newProfilePicture,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  profilePictureUploadModalToggle: () => dispatch(actions.profilePictureUploadModalToggle()),
  setNewProfilePicture: (image) => dispatch(actions.setNewProfilePicture(image)),
  removeProfilePicture: (data) => dispatch(actions.removeProfilePicture(data)),
  getPreSignedUrl: (data) => dispatch(actions.getPreSignedUrl(data)),
  getProfileDetails: (id) => dispatch(actions.getProfileDetails(id)),
  uploadNewProfilePictureSuccess: () => dispatch(actions.uploadNewProfilePictureSuccess()),
  uploadNewProfilePictureFailed: () => dispatch(actions.uploadNewProfilePictureFailed())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureModal)
