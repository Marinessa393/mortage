import { Add } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import './style.scss'


const AddBankBtn = ({openModal, initData}) => {
  return (
    <Tooltip title="Add bank" placement="left-start">
    <button type="button" className="addBtn" onClick={() => openModal(initData)}>
      <span>Add bank </span><Add/>
      </button>
      </Tooltip>
  )
}

export default AddBankBtn
