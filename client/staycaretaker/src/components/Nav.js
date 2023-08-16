import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { AppContext } from "../App";
import MenuIcon from '@mui/icons-material/Menu';
import '../css/Nav.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ManageAccountsOutlined as ManageAccountsOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  LocationCityRounded as LocationCityRoundedIcon,
  Groups2Outlined as Groups2OutlinedIcon,
} from "@mui/icons-material";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, setToken, username } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.delete('/users/logout');
      if (res.status === 200) {
        setToken('');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <nav className="navbar">
        <div className="responsive-menu">
      <Button onClick={handleMenuOpen} className="menu-icon">
        <MenuIcon /> {username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/">
          Home
        </MenuItem>
        {token ? (
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
              Update Password
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/contact">
              Contact Us
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/booking">
              Booking <CalendarMonthOutlinedIcon />
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/accomodations">
              Accomodations <LocationCityRoundedIcon />
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/clients">
              Clients <Groups2OutlinedIcon />
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/register">
              Register
            </MenuItem>
          </>
        )}
      </Menu>
      </div>

      <div className="old-navbar">
      <Stack spacing = {7} direction = {"row"}>
            
            {!token &&(
                <>
                <Button component = {Link} to = '/'>
                Home
                </Button>
                <Button component = {Link} to = '/login'>
                Login
                </Button>
                <Button component = {Link} to = '/register'>
                Register
                </Button>
                </>
            )}
            {token &&(
                <>
                
                <Button component = {Link} to = '/'>
                Home
                </Button>
                <Button component={Link} to="/booking">
                Booking <CalendarMonthOutlinedIcon />
                </Button>
                <Button component={Link} to="/accomodations">
                Accomodations < LocationCityRoundedIcon/>
                </Button>                
                <Button component={Link} to="/clients">
                Clients <Groups2OutlinedIcon/>
                </Button>
                <Button component={Link} to="/profile">
                <ManageAccountsOutlinedIcon style={{color:'blue'}} />
                </Button>
                <Button onClick={logout}>
                Logout
                </Button>
                </>
            )}
            
            
        </Stack> 
      </div>
    
    </nav>
    </>
  );
};

export default Nav;
