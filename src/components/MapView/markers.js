import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './assets/marker.scss'

const ColorCircleBox = (props) => {
  const { className, date, value, selectedClass, passangerCount, peak } = props
  let coloreData = null
  const selectedkeys = Object.keys(selectedClass)
  switch (selectedkeys.length) {
    case 4:
      coloreData = (
        <div width="38" height="38" className="date-svg__icon date-svg__icon--s4"
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--c3': `${value && value[selectedkeys[2]] && value[selectedkeys[2]].seats >= passangerCount ? `var(--${selectedkeys[2]})` : ''}`,
            '--c4': `${value && value[selectedkeys[3]] && value[selectedkeys[3]].seats >= passangerCount ? `var(--${selectedkeys[3]})` : ''}`,
            '--ci-opacity': `${peak ? 0.08 : 1}`
          }}
        />
      )
      break
    case 3:
      coloreData = (
        <div width="38" height="38" className="date-svg__icon date-svg__icon--s3"
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--c3': `${value && value[selectedkeys[2]] && value[selectedkeys[2]].seats >= passangerCount ? `var(--${selectedkeys[2]})` : ''}`,
            '--ci-opacity': `${peak ? 0.08 : 1}`
          }}
        />
      )
      break
    case 2:
      coloreData = (
        <div width="38" height="38" className="date-svg__icon date-svg__icon--s2"
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--ci-opacity': `${peak ? 0.08 : 1}`
          }}
        />
      )
      break
    case 1:
      coloreData = (
        <div width="38" height="38" className="date-svg__icon date-svg__icon--s1"
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--ci-opacity': `${peak ? 0.08 : 1}`
          }}
        />
      )
      break
    default:
      coloreData = (
        <div width="38" height="38" className="date-svg__icon date-svg__icon--s0"
          style={{
            '--ci-opacity': `${peak ? 0.08 : 1}`
          }}
        />
      )
  }
  return (
    <div className={`color-circle ${className ? className : ''}`} >
      {coloreData}
      <span className={`color-circle__text ${peak ? 'color-circle__text--off-peak' : 'color-circle__text--peak'}`}>{moment(date).format('DD')}</span>
    </div>
  )
}

ColorCircleBox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  date: PropTypes.string,
  passangerCount: PropTypes.string,
  selectedClass: PropTypes.object,
  peak: PropTypes.bool
}

export default ColorCircleBox
