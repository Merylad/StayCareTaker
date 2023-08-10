import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';



const UpdateCharges = ({ charge, open, onClose, onUpdate}) =>{
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const appt_id = charge.appt_id
    const charge_id = charge.charge_id

    const data = {appt_id, name, amount, currency,selectedDate,charge_id}
    

    
    useEffect(()=>{
        
        setName(charge.name);
        setAmount(charge.amount);
        setCurrency(charge.currency);
        
        setSelectedDate(dayjs(charge.date));
        console.log('dayjs', dayjs('2022-04-17'))
        console.log('value', dayjs(charge.date))
    }, [charge])

    
 

  return (
    <>
       <Dialog open={open} onClose={onClose} aria-labelledby="update-client-dialog-title">
            <DialogTitle id="update-client-dialog-title">Update Apartment</DialogTitle>
            <DialogContent>
          <form>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="name"
              type="name"
              label="Name"
              variant="outlined"
              value= {name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="amount"
              type="amount"
              label="Amount"
              variant="outlined"
              value= {amount}
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
          </form>
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

export default UpdateCharges;