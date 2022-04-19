import { AttachMoneyRounded, DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './style.scss';

const Header = ({isLight}) => {
  const path = useLocation().pathname;
  const disable = (link) => link === path;
  const [light, setLight] = useState(isLight);

  const switchTheme = () => {
    document.body.classList.toggle('light');
    setLight(!light);
  };

  return (
    <header>
      <h3 className="logo"><AttachMoneyRounded color="warning" size="small"/> <span>MoneyLoan</span></h3>
      <div className="buttons">
        <Tooltip title="Switch theme">
        <IconButton className="switcher" onClick={switchTheme} variant="outlined" color="warning">
          {light ? <DarkModeTwoTone/> : <LightModeTwoTone/>}
        </IconButton>
        </Tooltip>
        <NavLink to="/" className={disable('/') ? 'btn active' : 'btn'}><span>Main page</span></NavLink>
        <NavLink to="/calc" className={disable('/calc') ? 'btn active' : 'btn'}><span>Calculator</span></NavLink>
      </div>
    </header>
  )
}

export default Header
