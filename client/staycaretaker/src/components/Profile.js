import {useState, useContext} from 'react';
import {AppContext} from '../App';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { TextField, Button,Grid, Paper, Typography} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const paperStyle = {padding: '30px 20px', width:400,  margin: '40px auto'};
const headerStyle = {margin: 0};

const Profile = () =>{
    const {user_id, username, firstname, lastname, setToken } = useContext(AppContext);
    const [profileUsername, setProfileUsername] = useState('');
    const [old_password, setOld_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [msg, setMsg] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [old_passwordError, setOld_passwordError] = useState('');
    const [new_passwordError, setNew_passwordError] = useState('');

    const navigate = useNavigate()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const handleSubmit = async (e)=>{
        e.preventDefault()

        setUsernameError('');
        setOld_passwordError('');
        setNew_passwordError('');

        let isValid = true;

        if (profileUsername.trim() === '') {
            setUsernameError('Username is required');
            isValid = false;
          }
        if (old_password.trim() === '') {
            setOld_passwordError('Old Password is required');
            isValid = false;
          }
          if (!new_password.match(passwordRegex)) {
            setNew_passwordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');
            isValid = false;
          }

        if (isValid){
            const form = {username : profileUsername, last_password : old_password, new_password }

            try{
                const res = await axios.put(`/users/password/${user_id}`, form);
                setMsg('');
                if (res.status === 200){
                    const row = await axios.delete('/users/logout');
                    if (row.status ===200){
                    setToken('');
                    navigate('/login');
                }
                
        }

            }catch(e){
                console.log(e);
                setMsg(e.response.data.msg)

            }

        }

    }

    return (
        <>
            <Grid>
            <Paper elevation = {20} style = {paperStyle}>
                <Grid align = 'center'>
                    <ManageAccountsOutlinedIcon fontSize="large" style={{color:"blue"}} ></ManageAccountsOutlinedIcon>
                    <h2 style = {headerStyle}>Hi {firstname + ' ' + lastname} </h2>
                    <Typography variant = 'caption'>Do you want to update your password ? This way &#x25BC;</Typography>
                </Grid>
                <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='username' 
                type="username" 
                label = "Username" 
                variant = "outlined" 
                onChange={(e)=>setProfileUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                /> 

                <TextField fullWidth sx = {{m:1}} 
                id='last_password' 
                type="password" 
                label = "Old Password" 
                variant = "outlined" 
                onChange={(e)=>setOld_password(e.target.value)}
                error={!!old_passwordError}
                helperText={old_passwordError}
                />

                <TextField fullWidth sx = {{m:1}} 
                id='new_password' 
                type="password" 
                label = "New Password" 
                variant = "outlined" 
                onChange={(e)=>setNew_password(e.target.value)}
                error={!!new_passwordError}
                helperText={new_passwordError}
                />
                <Button 
                fullWidth 
                type='submit' 
                variant="contained" 
                color='primary' 
                onClick={(e)=>handleSubmit(e)}
                >Change password</Button>
                </form>
                {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
                
            </Paper>
        </Grid>
        </>
    )
}

export default Profile