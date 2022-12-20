import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, removeAccessToken } from '@/utils/localStorage/index'
import './userDropDown.scss'


const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = JSON.parse(getAuth())
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    setAnchorEl(null);
    removeAccessToken()
    window.location = '/login'
  };
  return (
    <div>
      <div className='d-flex'>
        <span className='mx-3'>{auth?.name}</span>
        <div className='app-icon' onClick={handleClick}>
          <AppsIcon/>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
        onClick={handleLogOut}
        >
          <LogoutIcon/> Log out
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserDropDown
