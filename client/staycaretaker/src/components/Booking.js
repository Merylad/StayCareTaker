import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../App';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import dayjs from 'dayjs';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'blue',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'lightblue',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getApptName = async(id) =>{
    try{
        const res = await axios.get(`appts/byappt/${id}`)
        return res.data

    }catch(e){
        console.log (e)
    }
}

const Booking = () =>{
    const {user_id} = useContext(AppContext);
    const [allRentals, setAllRentals] = useState([])

    function createData(rental_id, accomodation, client, arrival, departure, price_per_night, currency, origin, confirmed) {
        const formattedArrival = dayjs(arrival).locale('en').format('D MMMM YYYY');
        const formattedDeparture = dayjs(departure).locale('en').format('D MMMM YYYY');

        return { rental_id,
                 accomodation, 
                 client, 
                 arrival : formattedArrival, 
                 departure : formattedDeparture, 
                 price_per_night, 
                 currency, 
                 origin, 
                 confirmed };
      }
      
      const rows = [];

      allRentals.map(rental=>{
        const data = createData(rental.rental_id,rental.appt_id, rental.client_id, rental.arrival, rental.departure, rental.price_per_night, rental.currency, rental.origin, rental.confirmed);
        rows.push(data);
      })



    useEffect (()=>{
        getRentals()
    }, [])

    const getRentals = async () =>{
        try{
            const res = await axios.get(`/rentals/byuser/${user_id}`);
            setAllRentals(res.data)
            console.log ('allRentals: ', res.data)

        }catch(e){
            console.log(e)
        }
    }
    return(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Accomodation</StyledTableCell>
            <StyledTableCell align="right">Client</StyledTableCell>
            <StyledTableCell align="right">Arrival</StyledTableCell>
            <StyledTableCell align="right">Departure</StyledTableCell>
            <StyledTableCell align="right">Price per Night</StyledTableCell>
            <StyledTableCell align="right">Currency</StyledTableCell>
            <StyledTableCell align="right">Origin</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.rental_id}>
              <StyledTableCell component="th" scope="row">
                {row.accomodation}
              </StyledTableCell>
              <StyledTableCell align="right">{row.client}</StyledTableCell>
              <StyledTableCell align="right">{row.arrival}</StyledTableCell>
              <StyledTableCell align="right">{row.departure}</StyledTableCell>
              <StyledTableCell align="right">{row.price_per_night}</StyledTableCell>
              <StyledTableCell align="right">{row.currency}</StyledTableCell>
              <StyledTableCell align="right">{row.origin}</StyledTableCell>
              <StyledTableCell align="right">{row.confirmed}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Booking;