import {useState, useContext, useEffect} from 'react';
import {AppContext} from '../App';
import axios from 'axios';
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Grid, Card, CardContent, Typography, CardActions, Button} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Snackbar, SnackbarContent } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import UpdateCharges from './UpdateCharges';


const styles = {
    card: {
        borderRadius: 16,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10px',
    },
    content: {
        paddingBottom: '16px !important',
    },
    button: {
        fontWeight: 'bold',
    },
};


const Charges = (props) =>{
    const [user_charges, setUser_charges] = useState([]);
    const {user_id} = useContext(AppContext);
    const [chargeToDeleteId, setChargeToDeleteId] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedChargeToUpdate, setSelectedChargeToUpdate] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const accomodation = props.accomodation
    const appt_id = accomodation.appt_id

    


    useEffect(()=>{
        getCharges()
    }, [])

    const getCharges = async ()=>{
        try{
            const res = await axios.get(`/charges/${appt_id}`)
            setUser_charges(res.data)
        }catch(e){
            console.log(e)
        }
    }

    const openDeleteConfirmation = (id) => {
        setChargeToDeleteId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDelete = async (charge_id) => {
        try {
            const res = await axios.delete(`/charges/${charge_id}`);
            getCharges(); 
            setDeleteSuccess(true); 
            } catch (err) {
                console.log(err);
            }
        };

    const handleUpdateClick = (charge) => {
        setSelectedChargeToUpdate(charge);
        setUpdateDialogOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setSelectedChargeToUpdate(null);
        setUpdateDialogOpen(false);
    };

    const handleUpdate = async (data) => {
        const {appt_id, name, amount, currency,selectedDate,charge_id} = data
        const date = selectedDate.$d;
        const formatedDate= date.toDateString();
        const form = {appt_id, name, amount, currency, date: formatedDate}
        try{
            const res = await axios.put(`/charges/${charge_id}`, form)
            setUpdateSuccess(true)
            handleUpdateDialogClose();
            getCharges();
        }catch(err){
            console.log(err)
            
            
        }
        
        
    };

    return(
        <>
        <Grid container spacing={3} >
        {user_charges.map(charge =>{
            return(
                <Grid item key={charge.charge_id} xs={12} sm={6} md={4}>
            <Card variant="outlined" style={styles.card}>
                <CardContent style={styles.content}>
                    <Typography variant="h6" component="div">
                        {charge.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="textSecondary">
                         {charge.amount} {charge.currency}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="textSecondary">
                    {format(new Date(charge.date), 'dd MMMM yyyy')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                    size="small" 
                    style={styles.button} 
                    color="primary"
                    onClick={() => handleUpdateClick(charge)}
                    >
                        Update <UpdateIcon/>
                    </Button>
                    <Button 
                    size="small" 
                    style={styles.button} 
                    color="secondary" 
                    onClick={()=>openDeleteConfirmation(charge.charge_id)}>
                        Delete <DeleteIcon/>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
            )
        })}
        </Grid>

        <Link to="/addcharges" style={{ textDecoration: 'none' }}>
            <Card variant="outlined" style={styles.card}>
              <CardContent style={{ ...styles.content, textAlign: 'center' }}>
                <Typography variant="h4" component="div">
                  Add a new charge                  
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
                    Are you sure you want to delete this charge?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        setDeleteConfirmationOpen(false);
                        handleDelete(chargeToDeleteId);
                    }}
                    color="secondary"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>

        {updateDialogOpen && selectedChargeToUpdate && (
                <UpdateCharges
                    charge={selectedChargeToUpdate}
                    open={updateDialogOpen}
                    onClose={handleUpdateDialogClose}
                    onUpdate={handleUpdate}
                    
                />
            )}

        <Snackbar
            open={deleteSuccess}
            autoHideDuration={3000} 
            onClose={() => setDeleteSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Charge successfully deleted."
            />
        </Snackbar>

        <Snackbar
            open={updateSuccess}
            autoHideDuration={3000} 
            onClose={() => setUpdateSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Charge successfully updated."
            />
        </Snackbar>
            
        </>

        
    )
}

export default Charges;