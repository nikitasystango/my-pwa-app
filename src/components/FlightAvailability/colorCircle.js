import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './assets/colorCircle.scss'

const ColorCircleBox = (props) => {
  const { className, date, value, selectedClass, passangerCount, peak, highlightOffPeak } = props
  let coloreData = null
  const selectedkeys = Object.keys(selectedClass)

  switch (selectedkeys.length) {
    case 4:
      coloreData = (
        <div width="38" height="38" className= {`date-svg__icon date-svg__icon--s4 ${highlightOffPeak && !peak ? 'design_variation2__icon' : '' }`}
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--c4': `${value && value[selectedkeys[2]] && value[selectedkeys[2]].seats >= passangerCount ? `var(--${selectedkeys[2]})` : ''}`,
            '--c3': `${value && value[selectedkeys[3]] && value[selectedkeys[3]].seats >= passangerCount ? `var(--${selectedkeys[3]})` : ''}`,
            '--ci-opacity': 0.08
          }}
        />
      )
      break
    case 3:
      coloreData = (
        <div width="38" height="38" className= {`date-svg__icon date-svg__icon--s3 ${highlightOffPeak && !peak ? 'design_variation2__icon' : '' }`}
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--c3': `${value && value[selectedkeys[2]] && value[selectedkeys[2]].seats >= passangerCount ? `var(--${selectedkeys[2]})` : ''}`,
            '--ci-opacity': 0.08
          }}
        />
      )
      break
    case 2:
      coloreData = (
        <div width="38" height="38" className= {`date-svg__icon date-svg__icon--s2 ${highlightOffPeak && !peak ? 'design_variation2__icon' : '' }`}
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--c2': `${value && value[selectedkeys[1]] && value[selectedkeys[1]].seats >= passangerCount ? `var(--${selectedkeys[1]})` : ''}`,
            '--ci-opacity': 0.08
          }}
        />
      )
      break
    case 1:
      coloreData = (
        <div width="38" height="38" className= {`date-svg__icon date-svg__icon--s1 ${highlightOffPeak && !peak ? 'design_variation2__icon' : '' }`}
          style={{
            '--c1': `${value && value[selectedkeys[0]] && value[selectedkeys[0]].seats >= passangerCount ? `var(--${selectedkeys[0]})` : ''}`,
            '--ci-opacity': 0.08
          }}
        />
      )
      break
    default:
      coloreData = (
        <div width="38" height="38" className= {`date-svg__icon date-svg__icon--s0 ${highlightOffPeak && !peak ? 'design_variation2__icon' : '' }`}
          style={{
            '--ci-opacity': 0.08
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
  passangerCount: PropTypes.number,
  selectedClass: PropTypes.object,
  peak: PropTypes.bool,
  highlightOffPeak: PropTypes.bool
}

export default ColorCircleBox
