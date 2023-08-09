import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert } from '@mui/material';
import {useState, useContext, useEffect} from 'react';
import { AppContext} from '../App';



const UpdateClient = ({ client, open, onClose, onUpdate, msg }) => {
    const {user_id} = useContext (AppContext);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname]= useState('');
    const client_id = client.client_id
    const data = {firstname, lastname, email, phone, client_id, user_id}

    useEffect(()=>{
        setFirstname(client.firstname)
        setLastname(client.lastname)
        setEmail(client.email)
        setPhone(client.phone)
    }, [])


    
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="update-client-dialog-title">
            <DialogTitle id="update-client-dialog-title">Update Client</DialogTitle>
            <DialogContent>
            <form>
                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='firstname' 
                type="firstname" 
                label = "Firstname" 
                variant = "outlined" 
                value= {firstname}
                onChange={(e)=>setFirstname(e.target.value)} 
                />

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='lastname' 
                type="lastname" 
                label = "Lastname" 
                variant = "outlined"
                value= {lastname}
                onChange={(e)=>setLastname(e.target.value)} 
                />

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='email' 
                type="email" 
                label = "Email" 
                variant = "outlined" 
                value= {email}
                onChange={(e)=>setEmail(e.target.value)} 
                />

                <TextField 
                fullWidth 
                sx = {{m:1}} 
                id='phone' 
                type="phone" 
                label = "Phone Number" 
                variant = "outlined" 
                value= {phone}
                onChange={(e)=>setPhone(e.target.value)} 
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