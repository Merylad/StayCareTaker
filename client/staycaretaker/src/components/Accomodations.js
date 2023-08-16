import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {AppContext} from '../App';
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Snackbar, SnackbarContent } from '@mui/material';
import UpdateAppt from './UpdateAppt';



//Styling the cards
const container = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center'
   
};

const cardStyle = {
    width: '300px', 
    margin: '16px', 
    borderRadius: '20%', 
    backgroundImage: "url('https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=')", 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    
    
}

const contentStyle = {
    padding: '16px',
    
    
};


const Accomodations = () =>{
    
    const {user_id, setApptCharges, setUserAppts, userAppts} = useContext(AppContext);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [clientToDeleteId, setClientToDeleteId] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedApptToUpdate, setSelectedApptToUpdate] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [msg, setMsg]= useState('')
    
    useEffect(()=>{
        getAppts();
    }, [])

    const getAppts = async () =>{
        try{
            const res = await axios.get(`/appts/byuser/${user_id}`);

            setUserAppts(res.data);
        } catch(e){
            console.log(e);
        }
    }

    //open the snackbar to confirm the deletion
    const openDeleteConfirmation = (id) => {
        setClientToDeleteId(id);
        setDeleteConfirmationOpen(true);
    };

    //if the user confirms we call this function
    const handleDelete = async (appt_id) => {
        try {
            const res = await axios.delete(`/appts/${appt_id}`);
            getAppts(); 
            setDeleteSuccess(true); 
            
            } catch (err) {
                console.log(err);
                
                
            }
        };
    
    const handleUpdateClick = (accomodation) => {
        setSelectedApptToUpdate(accomodation);
        setUpdateDialogOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setSelectedApptToUpdate(null);
        setUpdateDialogOpen(false);
    };

    //The handleUpdate is called when the user click 'update' on the dialog
    const handleUpdate = async (data) => {
        const {name, city, appt_id} = data
        const form = {user_id, name, city}
        try{
            const res = await axios.put(`/appts/${appt_id}`, form)
            setUpdateSuccess(true)
            handleUpdateDialogClose();
            getAppts();
        }catch(err){
            console.log(err)
            setMsg(err.response.data.msg)
            
            
        }
            
        }
        
        
    

    return(
        <div style={container}>
            {userAppts.map((accommodation) => (
                <Card key={accommodation.appt_id} style={cardStyle}>
                                     
                <CardContent style={contentStyle}>
                    <Typography variant="h4">{accommodation.name}</Typography>
                    <Typography variant="h6">{accommodation.city}</Typography>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'space-around' }}>
                <Button 
                    size="small"
                    color="primary"
                    variant = "contained"
                    onClick={() => handleUpdateClick(accommodation)}>
                        Update <UpdateIcon/>
                    </Button>
                    
                    <Link
                       to='/charges'>
                            <Button 
                            variant = "contained" 
                            color="success" 
                            size="small"
                            style={{marginLeft: '7px'}}
                            onClick={()=>setApptCharges(accommodation)}>
                                Charges <AccountBalanceRoundedIcon/>
                            </Button>

                     </Link>
                    <Button 
                    size="small"  
                    color="secondary" 
                    variant = "contained"
                    onClick={()=>openDeleteConfirmation(accommodation.appt_id)}>
                        Delete <DeleteIcon/>
                    </Button>
                    
                    
                </CardActions>
            </Card>
            ))}
            <Link to="/addappt" style={{ textDecoration: 'none' }}>
            <Card style={cardStyle}>                                     
                <CardContent style={contentStyle}>
                <Typography variant="h4" component="div">
                  Add a new apartment                  
                </Typography>
                <AddCircleOutlineIcon style={{ fontSize: 60 }} />
                </CardContent>

            </Card>
            </Link>

            <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
>       
            <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this apartment?
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

        <Snackbar
            open={deleteSuccess}
            autoHideDuration={3000} 
            onClose={() => setDeleteSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Apartment successfully deleted."
            />
        </Snackbar>

        {updateDialogOpen && selectedApptToUpdate && (
                <UpdateAppt
                    accomodation={selectedApptToUpdate}
                    open={updateDialogOpen}
                    onClose={handleUpdateDialogClose}
                    onUpdate={handleUpdate}
                    msg={msg}
                />
            )}
        
        <Snackbar
            open={updateSuccess}
            autoHideDuration={3000} 
            onClose={() => setUpdateSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Apartment successfully updated."
            />
        </Snackbar>


        </div>
    )
}

export default Accomodations;


