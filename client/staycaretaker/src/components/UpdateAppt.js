import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert } from '@mui/material';
import {useState, useContext, useEffect} from 'react';


const UpdateClient = ({ accomodation, open, onClose, onUpdate, msg}) => {
    
    const [name, setName] = useState('');
    const [city, setCity]= useState('');

    const appt_id = accomodation.appt_id
    const data = {name, city, appt_id}

    useEffect(()=>{
        
        setName(accomodation.name);
        setCity(accomodation.city)
    }, [])


    
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="update-client-dialog-title">
            <DialogTitle id="update-client-dialog-title">Update Apartment</DialogTitle>
            <DialogContent>
            <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='name' 
                type="name" 
                label = "name" 
                variant = "outlined" 
                value= {name}
                onChange={(e)=>setName(e.target.value)} 
                />

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='city' 
                type="city" 
                label = "city" 
                variant = "outlined"
                value= {city}
                onChange={(e)=>setCity(e.target.value)} 
                />

                </form>
                {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>onUpdate(data)} color="secondary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateClient;