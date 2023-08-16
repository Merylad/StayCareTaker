import React, { useState, useContext, useEffect} from 'react';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AppContext} from '../App';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Alert from '@mui/material/Alert';

const AddRental = () =>{
    const [selectedAppt, setSelectedAppt] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null); 
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [origin, setOrigin] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const {user_id, userAppts, setUserAppts, userClients, setUserClients} = useContext(AppContext);

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    

  
    const paperStyle = { padding: '30px 20px', width: 400, margin: '40px auto' };
    const headerStyle = { margin: 0 };

    useEffect(()=>{
        getAppts();
        getClients();
    }, [])

    const getAppts = async () =>{
        try{
            const res = await axios.get(`/appts/byuser/${user_id}`);

            setUserAppts(res.data);
        } catch(e){
            console.log(e);
        }
    }

    const getClients = async()=>{
      try{
          const res = await axios.get(`/clients/byuser/${user_id}`);
          setUserClients(res.data);
      }catch(err){
          console.log(err);
      }
      
  }

    useEffect(()=>{
        getAppts();
    }, [])
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = {
        user_id, 
        appt_id : selectedAppt,
        client_id: selectedClient,
        arrival: arrivalDate.$d.toDateString(),
        departure: departureDate.$d.toDateString(),
        price_per_night: amount,
        currency,
        origin, 
        confirmed
      }

      let isValid = true

      if(departureDate < arrivalDate){
        isValid = false
        setMsg("The departure can't be before the arrival")
      }

      if(isValid){
        try{
          const res = await axios.post('/rentals', formData);
          setMsg('');
          navigate('/booking');
        } catch(e){
          console.log(e);
          setMsg(e.response.data.msg)

        }
      }
    };
  
    return (
      <>
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <CalendarMonthOutlinedIcon fontSize="large" style={{ color: 'blue' }}></CalendarMonthOutlinedIcon>
              <h2 style={headerStyle}>Add Rental</h2>
              <Typography variant="caption">Please fill this form to add a rental!</Typography>
            </Grid>
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
                  value={arrivalDate}
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
  
              <Button 
              fullWidth 
              type="submit" 
              variant="contained" 
              color="primary" 
              onClick={(e) => handleSubmit(e)}>
                Add Rental
              </Button>
            </form>
            {msg==='' ? <></> : <Alert severity="error">{msg}</Alert>}
          </Paper>
        </Grid>
        
      </>
    );
}

export default AddRental;