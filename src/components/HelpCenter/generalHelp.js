import React, { useState } from 'react'
import { Accordion } from 'semantic-ui-react'
import { Plus, Minus } from '../../utils/svgs'
import ReactHtmlParser from 'react-html-parser'

const GeneralHelp = (props) => {

  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  return (
    <>
      <Accordion>
        {props.questionData.map((data, index) => (
          <div className="accordion__item" key={data.id}>
            <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={handleClick}
            >
              <Minus />
              <Plus />
              {data.question}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              {ReactHtmlParser(data.answer)}
            </Accordion.Content>
          </div>
    ))}
      </Accordion>
    </>
  )
}

export default GeneralHelp
