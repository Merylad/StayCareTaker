import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AppContext} from '../App';
import dayjs from 'dayjs';



const UpdateRental = ({ rental, open, onClose, onUpdate, msg}) =>{
    const [selectedAppt, setSelectedAppt] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState(''); 
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [origin, setOrigin] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const {user_id, userAppts, setUserAppts, userClients, setUserClients} = useContext(AppContext);

     useEffect(()=>{
        console.log('rental', rental)
        setSelectedAppt(rental.accomodation);
        setSelectedClient(rental.client);
        setArrivalDate(dayjs(rental.arrival));
        setDepartureDate(dayjs(rental.departure));
        setAmount(rental.price_per_night);
        setCurrency(rental.currency);
        setOrigin(rental.origin);
        setConfirmed(rental.confirmed);
    }, [])

    const data = {
            rental_id : rental.rental_id,
            user_id, 
            appt_id : selectedAppt,
            client_id: selectedClient,
            arrival: arrivalDate,
            departure: departureDate,
            price_per_night: amount,
            currency,
            origin, 
            confirmed
          }


  return (
    <>
       <Dialog open={open} onClose={onClose} aria-labelledby="update-client-dialog-title">
            <DialogTitle id="update-client-dialog-title">Update Apartment</DialogTitle>
            <DialogContent>
            <form>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Accomodation</InputLabel>
                <Select
                  fullWidth
                  id="selectedAppt"
                  label="Accomodation"
                  variant="outlined"
                  value={selectedAppt}
                  onChange={(e) => setSelectedAppt(e.target.value)}
                >
                    {userAppts.map(appt=>{
                        return(
                            <MenuItem value={appt.appt_id}>{appt.name}</MenuItem>
                        )
                    })}
                </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Client</InputLabel>
                <Select
                  fullWidth
                  id="selectedClient"
                  label="Client"
                  variant="outlined"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                    {userClients.map(client=>{
                        return(
                            <MenuItem value={client.client_id}>{client.lastname + ' ' }{client.firstname}</MenuItem>
                        )
                    })}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  
                  label="Arrival"
                  slotProps={{ textField: { fullWidth: true } }}
                  value={arrivalDate}
                  onChange={(date) => setArrivalDate(date)}
                  renderInput={(params) => <TextField {...params}  />}
                />
              </LocalizationProvider>
              </FormControl>
              
              <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  
                  label="Departure"
                  slotProps={{ textField: { fullWidth: true } }}
                  value={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  renderInput={(params) => <TextField {...params}  />}
                />
              </LocalizationProvider>
              </FormControl>

              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="amount"
                type="amount"
                value={amount}
                label="Price per Night"
                variant="outlined"
                onChange={(e) => setAmount(e.target.value)}
              />

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  fullWidth
                  id="currency"
                  label="Currency"
                  variant="outlined"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="ILS">ILS</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Origin</InputLabel>
                <Select
                  fullWidth
                  id="origin"
                  label="Origin"
                  variant="outlined"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <MenuItem value="Airbnb">Airbnb</MenuItem>
                  <MenuItem value="Booking">Booking</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                  />
                }
                label="Has the location been confirmed ?"
                sx={{ m: 1 }}
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
      
    </>
  );
}

export default UpdateRental;