import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ProgressiveImage = (props) => {
  const { preview, image } = props
  const initialImg = preview ? preview : image
  const [currentImage, setCurrentImage] = useState(initialImg)
  const [loading, setLoading] = useState(true)
  let loadingImage = {}
  useEffect(() => {
    fetchImage(image)
    // returned function will be called on component unmount
    return () => {
      if (loadingImage) {
        loadingImage.onload = null
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCurrentImage(initialImg)
    setLoading(loading)
    // eslint-disable-next-line
  }, [image])

  useEffect(() => {
    fetchImage(image)
    // eslint-disable-next-line
  }, [currentImage])

  const fetchImage = (src) => {
    const image = new Image()
    image.onload = () => {
      setCurrentImage(loadingImage.src)
      setLoading(false)
    }
    image.src = src
    loadingImage = image
  }

  return (
      props.render(currentImage, loading)
  )
}

ProgressiveImage.propTypes = {
  preview: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string
}

export default ProgressiveImage
