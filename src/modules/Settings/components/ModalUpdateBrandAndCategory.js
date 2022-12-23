import React, { useState } from 'react'
import ModalStyled from '@/modules/components/ModalStyled'


const ModalUpdateBrandAndCategory = ({name, handleCloseModal, openModal, handleConfirm}) => {
  const [valueName, setValueName] = useState(name)
  const handleChange = (e) => {
    setValueName(e.target.value)
  }
  return (
    <ModalStyled width={400} handleCloseModal={handleCloseModal} openModal={openModal}>
      <div>
        <p>Name</p>
      </div>
      <div>
        <input type="text" className='form-control' value={valueName} onChange={(e) => handleChange(e)} autoFocus/>
      </div>
      <div className='d-flex justify-content-between mt-4'>
        <button className='btn btn-light' onClick={() => handleCloseModal()}>
          <span>Cancel</span>
        </button>
        <button className='btn btn-light' onClick={() => handleConfirm(valueName.trim())} disabled={!valueName}>
          <span className='text-primary'>Save</span>
        </button>
      </div>
    </ModalStyled>
  )
}

export default ModalUpdateBrandAndCategory