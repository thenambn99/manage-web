import React from 'react'
import UserDropDown from './userDropDown/UserDropDown'

const Header = () => {
  return (
    <div className='header d-flex justify-content-between align-items-center'>
      <p className='mb-0'>MANAGE</p>
      <UserDropDown/>
    </div>
  )
}

export default Header
