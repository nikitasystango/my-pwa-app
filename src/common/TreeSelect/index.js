import React from 'react'
import PropTypes from 'prop-types'
import TreeSelect from 'rc-tree-select'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'

const SelectTree = (props) => {
  return (
    <TreeSelect
      treeData={props.treeData}
      value={props.value || intl(commonMessages.cityAirpot)}
      transitionName="rc-tree-select-dropdown-slide-up"
      style={{ width: props.width || 150 }}
      dropdownStyle={{ maxHeight: 200, overflow: 'auto', zIndex: 1500 }}
      showSearch
      filterTreeNode={false}
      notFoundContent={props.notFoundContent === '' ? props.notFoundContent : intl(commonMessages.noPlaceFound)}
      treeNodeFilterProp={props.treeNodeFilterProp || intl(commonMessages.valueLabel)}
      treeNodeLabelProp={props.treeNodeLabelProp || intl(commonMessages.titleLabel)}
      searchPlaceholder={props.searchPlaceholder || intl(commonMessages.searchPlace)}
      searchValue={props.searchValue}
      onSearch={props.handleInputChange}
      onChange={props.handleInputChange}
      onSelect={props.handleSelectedItem}
      onDropdownVisibleChange={props.onDropdownVisibleChange}
    // dropdownPopupAlign={alignConfig}
    />
  )
}

SelectTree.propTypes = {
  treeData: PropTypes.array,
  value: PropTypes.string,
  notFoundContent: PropTypes.string,
  treeNodeFilterProp: PropTypes.string,
  treeNodeLabelProp: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSelectedItem: PropTypes.func,
  onDropdownVisibleChange: PropTypes.func,
  width: PropTypes.number
}

export default SelectTree
