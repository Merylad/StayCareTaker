import {useState, useContext} from 'react';
import { TextField, Button,Grid, Paper, Typography} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { AppContext } from '../App';


const Login = ()=>{

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const {setToken} = useContext(AppContext)

    const navigate = useNavigate()


    const paperStyle = {padding: '30px 20px', width:400,  margin: '40px auto'};
    const headerStyle = {margin: 0};

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setUsernameError('');
        setPasswordError('');

        let isValid = true;

        if (username.trim() === '') {
            setUsernameError('Username is required');
            isValid = false;
          }
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
          }

        if (isValid) {
            const form = {username, password}
            try{
                const res = await axios.post('/users/login', form) 
                setToken(res.data.token)
                setMsg('');
                navigate('/')

            }catch(err){
                console.log(err)
                setMsg(err.response.data.msg)
            }
        }
    }



    return (
        <>
        <Grid>
            <Paper elevation = {20} style = {paperStyle}>
                <Grid align = 'center'>
                    <LoginOutlinedIcon fontSize="large" style={{color:"blue"}} ></LoginOutlinedIcon>
                    <h2 style = {headerStyle}>Login</h2>
                    <Typography variant = 'caption'>Please fill this form to log in!</Typography>
                </Grid>
                <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='username' 
                type="username" 
                label = "Username" 
                variant = "outlined" 
                onChange={(e)=>setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}/> 

                <TextField fullWidth sx = {{m:1}} 
                id='password' 
                type="password" 
                label = "Password" 
                variant = "outlined" 
                onChange={(e)=>setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}/>
                <Button fullWidth type='submit' variant="contained" color='primary' onClick={(e)=>handleSubmit(e)}>Login</Button>
                </form>
                {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
                
            </Paper>
        </Grid>
        </>
    )
}

export default Login;