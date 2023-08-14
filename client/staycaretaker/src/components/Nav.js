import {Link} from "react-router-dom";
import {Button, Stack, Menu, MenuItem } from "@mui/material";
import '../css/Nav.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import { AppContext} from '../App';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';





const Nav = ()=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const {token, setToken} = useContext (AppContext);

    const logout = async()=>{
    try{
        const res = await axios.delete('/users/logout');
        if (res.status ===200){
            setToken('');
            navigate('/login');
        }
    }catch(err){
        console.log(err);
    }
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

    

    return(
        <nav className="navbar">
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
                 <Button onClick={handleMenuOpen}>
                    <ManageAccountsOutlinedIcon style={{color:'blue'}} />
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                     <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                    Update Password
                     </MenuItem> 
                     <MenuItem onClick={handleMenuClose} component={Link} to="/contact">
                    Contact Us
                     </MenuItem>             
                </Menu>
                <Button component = {Link} to = '/'>
                Home
                </Button>
                <Button component={Link} to="/accomodations">
                Accomodations < LocationCityRoundedIcon/>
                </Button>
                <Button component={Link} to="/booking">
                Booking <CalendarMonthOutlinedIcon />
                </Button>
                <Button component={Link} to="/clients">
                Clients <Groups2OutlinedIcon/>
                </Button>
                <Button onClick={logout}>
                Logout
                </Button>
                </>
            )}
            
            
        </Stack>
    </nav>
    )
}

export default Nav