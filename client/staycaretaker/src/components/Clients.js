import {useContext, useEffect, useState} from 'react';
import { AppContext} from '../App';
import axios from 'axios';
import {Link} from "react-router-dom";

import * as React from 'react';
import { blue } from '@mui/material/colors';
import { Grid, Card, CardContent, Typography, CardActions, Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpdateIcon from '@mui/icons-material/Update';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, SnackbarContent } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import UpdateClient from './UpdateClient';


const Clients = () =>{
    const {user_id} = useContext (AppContext);
    const [clients_list, setClients_list] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [clientToDeleteId, setClientToDeleteId] = useState(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedClientToUpdate, setSelectedClientToUpdate] = useState(null);
    const [deleteUpdate, setDeleteUpdate] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        getClients();
    },[])

    const getClients = async()=>{
        try{
            const res = await axios.get(`/clients/byuser/${user_id}`);
            setClients_list(res.data);
        }catch(err){
            console.log(err);
        }
        
    }

    const filteredClients = clients_list.filter((client) =>
    client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
    );

    const styles = {
        card: {
            borderRadius: 16,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: blue[50],
            margin: '10px',
        },
        content: {
            paddingBottom: '16px !important',
        },
        button: {
            fontWeight: 'bold',
        },
    };

    const renderClients = (clients)=>{
        return(
           <>
    {clients.map((client) => (
        <Grid item key={client.client_id} xs={12} sm={6} md={4}>
            <Card variant="outlined" style={styles.card}>
                <CardContent style={styles.content}>
                    <Typography variant="h6" component="div">
                        {client.firstname} {client.lastname}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="textSecondary">
                        <EmailIcon/> {client.email}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="textSecondary">
                        <PhoneAndroidIcon/> {client.phone}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                    size="small" 
                    style={styles.button} 
                    color="primary"
                    onClick={() => handleUpdateClick(client)}>
                        Update <UpdateIcon/>
                    </Button>
                    <Button size="small" style={styles.button} color="secondary" onClick={()=>openDeleteConfirmation(client.client_id)}>
                        Delete <DeleteIcon/>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    ))}
    </> 
    
        )
    }
    const openDeleteConfirmation = (id) => {
        setClientToDeleteId(id);
        setDeleteConfirmationOpen(true);
    };

    
    
    const handleDelete = async (client_id) => {
        console.log('in the handledelete')
        try {
            const res = await axios.delete(`/clients/${client_id}`);
            getClients(); 
            setDeleteSuccess(true); 
            console.log('deletesuccess')
            } catch (err) {
                console.log(err);
                console.log('deletefail')
            }
        };

        const handleUpdateClick = (client) => {
            setSelectedClientToUpdate(client);
            setUpdateDialogOpen(true);
        };

        const handleUpdateDialogClose = () => {
            setSelectedClientToUpdate(null);
            setUpdateDialogOpen(false);
        };

    const handleUpdate = async (data) => {
        const {firstname, lastname, email, phone, client_id, user_id} = data
        const form = {firstname, lastname, email, phone, user_id}
        try{
            const res = await axios.put(`/clients/${client_id}`, form)
            setDeleteUpdate(true)
            handleUpdateDialogClose();
            getClients();
        }catch(err){
            console.log(err)
            setMsg(err.response.data.msg)
            console.log('msg:', msg)
            
        }
        
        
    };


    return (
        <>
        
        <TextField
            label="Search"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            variant="filled"
            fullWidth
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value)}}
            sx={{
                marginBottom: 2,
                backgroundColor: 'lightblue', 
            }}
        />
         <Snackbar
            open={deleteSuccess}
            autoHideDuration={3000} 
            onClose={() => setDeleteSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Client successfully deleted."
            />
        </Snackbar>
        <Snackbar
            open={deleteUpdate}
            autoHideDuration={3000} 
            onClose={() => setDeleteUpdate(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Client successfully updated."
            />
        </Snackbar>
        <Grid container spacing={3} >
           {searchQuery!== '' ? renderClients(filteredClients) : renderClients(clients_list)}
           <Grid item xs={12} sm={6} md={4}>
        <Link to="/addclient" style={{ textDecoration: 'none' }}>
            <Card variant="outlined" style={styles.card}>
              <CardContent style={{ ...styles.content, textAlign: 'center' }}>
                <Typography variant="h4" component="div">
                  Add a new client                  
                </Typography>
                <AddCircleOutlineIcon style={{ fontSize: 60 }} />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        </Grid>
        
        <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
>       
            <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this client?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        setDeleteConfirmationOpen(false);
                        handleDelete(clientToDeleteId);
                    }}
                    color="secondary"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>

        {updateDialogOpen && selectedClientToUpdate && (
                <UpdateClient
                    client={selectedClientToUpdate}
                    open={updateDialogOpen}
                    onClose={handleUpdateDialogClose}
                    onUpdate={handleUpdate}
                    msg={msg}
                />
            )}
        
        </>
    );
}


export default Clients;