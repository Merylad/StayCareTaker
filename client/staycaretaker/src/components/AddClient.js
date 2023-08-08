import {useState, useContext} from 'react';
import { TextField, Button,Grid, Paper, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { AppContext} from '../App';


const AddClient = () =>{
    const {user_id} = useContext (AppContext);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname]= useState('');
    const [msg, setMsg] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');

    const navigate = useNavigate()

    const paperStyle = {padding: '30px 20px', width:400,  margin: '40px auto'};
    const headerStyle = {margin: 0};

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = {firstname, lastname, email, phone, user_id}
        try{
            const res = await axios.post('/clients', form)
            navigate('/clients')
            

        }catch(err){
            console.log(err)
            setMsg(err.response.data.msg)
        }
    }

    return(
        <>
        <Grid>
            <Paper elevation = {20} style = {paperStyle}>
                <Grid align = 'center'>
                    <Groups2OutlinedIcon fontSize="large" style={{color:"blue"}} ></Groups2OutlinedIcon>
                    <h2 style = {headerStyle}>Add Client</h2>
                    <Typography variant = 'caption'>Please fill this form to add a client!</Typography>
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
                id='phone' 
                type="phone" 
                label = "Phone Number" 
                variant = "outlined" 
                onChange={(e)=>setPhone(e.target.value)} 
                error={!!phoneError}
                helperText={phoneError}/>

                <Button fullWidth type='submit' variant="contained" color='primary' onClick={(e)=>handleSubmit(e)}>Add Client</Button>
                </form>
                {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
            </Paper>
        </Grid>
        
        </>
    )
}

export default AddClient;