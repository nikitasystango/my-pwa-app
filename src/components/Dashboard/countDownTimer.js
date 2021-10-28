import React, { useState, useEffect } from 'react'
import textContent from 'constants/staticText'

const CountDownTimer = (props) => {
  const { toggleModals } = props
  const [timeLeft, setTimeLeft] = useState(20)

  useEffect(() => {
    let timer = 0
    if (timeLeft === 0) {
      clearTimeout(timer)
      toggleModals('toggleTimer')
    } else {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  })

  return (
    <>
      <div>{`00:${timeLeft <= textContent.NINE ? `0${timeLeft}` : timeLeft}`}</div>
    </>
  )
}

export default CountDownTimer
