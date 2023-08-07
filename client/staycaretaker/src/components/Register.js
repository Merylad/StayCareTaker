import {useState} from 'react';
import { TextField, Button,Grid, Paper, Typography} from '@mui/material';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';


const Register = ()=>{
    const [email, setEmail] = useState('');
    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname]= useState('');
    const [msg, setMsg] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const navigate = useNavigate()

    const paperStyle = {padding: '30px 20px', width:400,  margin: '40px auto'};
    const headerStyle = {margin: 0};

    const handleSubmit = async (e) =>{
        e.preventDefault();
          // Reset previous error messages
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setFirstnameError('');
        setLastnameError('');

        let isValid = true;

        // Validate form fields
        if (email.trim() === '') {
          setEmailError('Email is required');
          isValid = false;
        }
        if (username.trim() === '') {
          setUsernameError('Username is required');
          isValid = false;
        }
        if (!password.match(passwordRegex)) {
            setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');
            isValid = false;
          }
        if (firstname.trim() === '') {
          setFirstnameError('First name is required');
          isValid = false;
        }
        if (lastname.trim() === '') {
          setLastnameError('Last name is required');
          isValid = false;
        }


        if (isValid) {
            const form = {email, username, password, firstname, lastname}
            try{
                const res = await axios.post('/users/register', form)
                setMsg('');
                navigate('/login')

            }catch(err){
                console.log(err)
                setMsg(err.response.data.error)
            }
        }

    }
    
    return (
        <>
        <Grid>
            <Paper elevation = {20} style = {paperStyle}>
                <Grid align = 'center'>
                    <AddHomeWorkOutlinedIcon fontSize="large" style={{color:"blue"}} ></AddHomeWorkOutlinedIcon>
                    <h2 style = {headerStyle}>Register</h2>
                    <Typography variant = 'caption'>Please fill this form to create an account!</Typography>
                </Grid>
                <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='firstname' 
                type="firstname" 
                label = "Firstname" 
                variant = "outlined" 
                onChange={(e)=>setFirstname(e.target.value)} 
                error={!!firstnameError} 
                helperText={firstnameError}/>

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='lastname' 
                type="lastname" 
                label = "Lastname" 
                variant = "outlined" 
                onChange={(e)=>setLastname(e.target.value)} 
                error={!!lastnameError}
                helperText={lastnameError}/>

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

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='email' 
                type="email" 
                label = "Email" 
                variant = "outlined" 
                onChange={(e)=>setEmail(e.target.value)} 
                error={!!emailError}
                helperText={emailError}/>

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='password' 
                type="password" 
                label = "Password" 
                variant = "outlined" 
                onChange={(e)=>setPassword(e.target.value)} 
                error={!!passwordError}
                helperText={passwordError}/>

                <Button fullWidth type='submit' variant="contained" color='primary' onClick={(e)=>handleSubmit(e)}>Register</Button>
                </form>
                {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
            </Paper>
        </Grid>
        
        </>
    )
}

export default Register;