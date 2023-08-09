import {useState, useContext} from 'react';
import { TextField, Button,Grid, Paper, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import { AppContext} from '../App';


const AddAppt = () =>{
    const {user_id} = useContext (AppContext);
    const [name, setName] = useState('');
    const [city, setCity]= useState('');

    

    const navigate = useNavigate()

    const paperStyle = {padding: '30px 20px', width:400,  margin: '40px auto'};
    const headerStyle = {margin: 0};

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = {user_id, name, city}
        try{
            const res = await axios.post('/appts', form)
            navigate('/accomodations')
            

        }catch(err){
            console.log(err)
            
        }
    }

    return(
        <>
        <Grid>
            <Paper elevation = {20} style = {paperStyle}>
                <Grid align = 'center'>
                    <LocationCityRoundedIcon fontSize="large" style={{color:"blue"}} ></LocationCityRoundedIcon>
                    <h2 style = {headerStyle}>Add Apartment</h2>
                    <Typography variant = 'caption'>Please fill this form to add an apartment!</Typography>
                </Grid>
                <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='name' 
                type="name" 
                label = "Name" 
                variant = "outlined" 
                onChange={(e)=>setName(e.target.value)} 
                />

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='city' 
                type="city" 
                label = "City" 
                variant = "outlined" 
                onChange={(e)=>setCity(e.target.value)} 
                />

                <Button fullWidth type='submit' variant="contained" color='primary' onClick={(e)=>handleSubmit(e)}>Add Apartment</Button>
                </form>
            </Paper>
        </Grid>
        
        </>
    )
}

export default AddAppt;