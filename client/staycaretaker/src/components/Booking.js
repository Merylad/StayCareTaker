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

import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Grid, Card, CardContent, Typography, CardActions, Button} from '@mui/material';

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



const Booking = () =>{
    const {user_id} = useContext(AppContext);
    const [allRentals, setAllRentals] = useState([])
    const [rows, setRows] = useState([]);

    const fetchApptName = async (id) => {
      try {
        const response = await fetch(`appts/byappt/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data[0].name;
      } catch (error) {
        console.error('Fetch error:', error);
        return ''; // Return a default value in case of error
      }
    };
  
    const fetchClientName = async (id) => {
      try {
        const response = await fetch(`clients/byclient/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data[0].lastname +' '+ data[0].firstname;
      } catch (error) {
        console.error('Fetch error:', error);
        return ''; // Return a default value in case of error
      }
    };




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



    useEffect (()=>{
        getRentals()
    }, [])

    const getRentals = async () => {
      try {
        const res = await axios.get(`/rentals/byuser/${user_id}`);
        const updatedRows = await Promise.all(
          res.data.map(async (rental) => {
            const apptName = await fetchApptName(rental.appt_id);
            const clientName = await fetchClientName(rental.client_id);
  
            const data = createData(
              rental.rental_id,
              apptName,
              clientName,
              rental.arrival,
              rental.departure,
              rental.price_per_night,
              rental.currency,
              rental.origin,
              rental.confirmed
            );
  
            return data;
          })
        );
  
        setRows(updatedRows);
      } catch (e) {
        console.error(e);
      }
    };
  
    return(
      <>
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
              <StyledTableCell align="right">
                {row.confirmed ? "✔️" : "❌"}
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Link to="/addrental" style={{ textDecoration: 'none' }}>
            <Card variant="outlined" style={styles.card}>
              <CardContent style={{ ...styles.content, textAlign: 'center' }}>
                <Typography variant="h4" component="div">
                  Add a new rental                 
                </Typography>
                <AddCircleOutlineIcon style={{ fontSize: 60 }} />
              </CardContent>
            </Card>
          </Link> 
    
    </>

    
    )
}

export default Booking;