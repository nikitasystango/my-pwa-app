/* eslint-disable react/prop-types */
/*
 * Collection of form fields
 * With some validations over these fields
*/
import React from 'react'
import { Form, Radio, Select } from 'semantic-ui-react'
// import DatePicker from 'react-datepicker'
import './index.scss'


const InputBox = ({ type, value, label, disabled, width, autoComplete, name, placeholder, onChange, errorMessage, onBlur, maxLength, className, loading, icon }) => {

  return (
    <React.Fragment>
      <Form.Input
      error={errorMessage ? true : false}
      fluid
      label={label || null}
      placeholder={placeholder || ''}
      type={type || 'text'}
      name={name}
      width={width || null}
      disabled={disabled || false}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete || 'new-password'}
      className={className ? className : ''}
      loading= {loading || false}
      icon = {icon || null}
      />
      {errorMessage && errorMessage !== 'Required' && (name === 'addEmail' || name === 'email') &&
      <span className="error-message">
        {errorMessage}
      </span>}
    </React.Fragment>

  )}

const InputCheckBox = ({ value, label, name, width, onClick, errorMessage, className }) => (
  <React.Fragment>
    <Form.Checkbox
      label={label || null}
      error={errorMessage ? true : false}
      checked={value}
      name={name}
      width={width || null}
      onChange={() => onClick()}
      className={className ? className : ''}
    />
    {errorMessage &&
      <span className="error-message">
        {errorMessage}
      </span>}
  </React.Fragment>
)

const InputRadio = ({ label, name, value, onChange, checked, className }) => (
  <Form.Field>
    <Radio
      label={label}
      name={name}
      value={value}
      checked={checked}
      onChange={(e, { value }) => onChange(value)}
      className={className ? className : ''}
    />
  </Form.Field>
)

const SelectBox = ({ placeholder, options, label, name, onChange, onBlur, Datavalue, errorMessage, className }) => (
  <React.Fragment>
    {label &&
      <label>
        <strong>
          {label}
        </strong>
      </label>}
    <Select
      placeholder={placeholder || ''}
      options={options}
      label={label || null}
      name={name}
      onChange={(e, { value }) => onChange(value)}
      onBlur={onBlur}
      value={Datavalue}
      selectOnBlur={false}
      error={errorMessage ? true : false}
      className={className ? className : ''}
    />
    {/* {
      errorMessage &&
      <span className="error-message">
        {errorMessage}
      </span>
    } */}
  </React.Fragment>
)
export {
  InputBox,
  InputCheckBox,
  InputRadio,
  SelectBox
}

