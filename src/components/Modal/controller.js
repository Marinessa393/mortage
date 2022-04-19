import './style.scss';
import React from 'react'
import Modal from '.'


const ModalController = ({ closeModal, open, obj, changeData }) => {
  
  const disabled = obj.title === '' || obj.rate === '0' || obj.rate === '' ||
    obj.maxLoan === '0' || obj.maxLoan === '' || obj.payment === '0' || obj.payment === '' ||
    obj.term === '0' || obj.term === '';
  
  return (
    <Modal closeModal={closeModal}
      data={obj}
      open={open}
      changeData={changeData}
      disabled={disabled}/>
  )
}

export default ModalController
