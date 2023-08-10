import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AppContext} from '../App';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const AddCharges = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const {apptCharges} = useContext(AppContext);
  const appt_id = apptCharges.appt_id;
  const navigate = useNavigate();

  const paperStyle = { padding: '30px 20px', width: 400, margin: '40px auto' };
  const headerStyle = { margin: 0 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = selectedDate.$d;
    const formatedDate= date.toDateString();
    
    const form = {appt_id, name, amount, currency, date : formatedDate};
    
    try{
        const res = await axios.post('/charges', form)
        navigate('/accomodations')

    }catch(e){
        console.log(e)
    }
    
    
  };

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <AccountBalanceRoundedIcon fontSize="large" style={{ color: 'blue' }}></AccountBalanceRoundedIcon>
            <h2 style={headerStyle}>Add Charge</h2>
            <Typography variant="caption">Please fill this form to add a charge!</Typography>
          </Grid>
          <form>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="name"
              type="name"
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="amount"
              type="amount"
              label="Amount"
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

            
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                
                label="Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params) => <TextField {...params}  />}
              />
            </LocalizationProvider>
            

            <Button fullWidth type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
              Add Charge
            </Button>
          </form>
        </Paper>
      </Grid>
      
    </>
  );
};

export default AddCharges;