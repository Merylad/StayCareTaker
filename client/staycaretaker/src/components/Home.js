import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import jwt_token from "jwt-decode";
import { Typography, Button, Container, Grid } from "@mui/material";
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { fetchApptName, fetchClientName } from "./Booking"; 
import CustomCalendar from "./CustomCalendar";

const Home = () => {
  const {
    token,
    setUser_id,
    user_id,
    userAppts,
    setUserAppts,
    setUserClients,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    rentals,
    setRentals,
    clientNames,
    setClientNames,
    apptNames,
    setApptNames

  } = useContext(AppContext);

  const [combinedEvents, setCombinedEvents] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState('');
  const [apptCharges, setApptCharges] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    console.log("token:", token);
    if (token) {
      const payload = jwt_token(token);
      setUser_id(payload.user_id);
      setFirstname(payload.firstname);
      setLastname(payload.lastname);
      setUsername(payload.username);

      getAppts(payload.user_id);
      getClients(payload.user_id);
      getRentals(payload.user_id);
    }
  }, []);

  const getAppts = async (user_id) => {
    try {
      const res = await axios.get(`/appts/byuser/${user_id}`);

      setUserAppts(res.data);
      const names = {};
      for (const appt of res.data) {
        const name = await fetchApptName(appt.appt_id);
        names[appt.appt_id] = name;
      }
      setApptNames(names);
    } catch (e) {
      console.log(e);
    }
  };

  const getClients = async (user_id) => {
    try {
      const res = await axios.get(`/clients/byuser/${user_id}`);
      setUserClients(res.data);
      const names = {};
      for (const client of res.data) {
        const name = await fetchClientName(client.client_id);
        names[client.client_id] = name;
      }
      setClientNames(names);
    } catch (err) {
      console.log(err);
    }
  };

  const getRentals = async (user_id) => {
    const currentDate = new Date();

    try {
      const res = await axios.get(`/rentals/byuser/${user_id}`);
      setRentals(res.data);

      const upcomingArrivals = res.data.filter(
        (rental) => new Date(rental.arrival) >= currentDate
      );

      const upcomingDepartures = res.data.filter(
        (rental) => new Date(rental.departure) >= currentDate
      );

      const events = [
        ...upcomingArrivals.map((event) => ({
          ...event,
          type: "arrival",
          date: event.arrival,
        })),
        ...upcomingDepartures.map((event) => ({
          ...event,
          type: "departure",
          date: event.departure,
        })),
      ];

      const sortEvents = events.sort(
        (a, b) =>
          new Date(a.arrival || a.departure) -
          new Date(b.arrival || b.departure)
      );
        console.log('sortEvents:', sortEvents)
      setCombinedEvents(sortEvents);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = async (e)=>{
    setSelectedAppt(e.target.value)

    try{
      const res = await axios.get(`/charges/${e.target.value}`)
      setApptCharges(res.data)
      }catch(e){
          console.log(e)
      }
  }


  return (
    <>
      {token ? (
        <>
          <h1 className="welcome">Hi {firstname} !</h1>
          <section id='homelogged'>
          <div id='homecalendar'>
          <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Accomodation</InputLabel>
                <Select
                  style = {{borderRadius: '10px'}}
                  id="selectedAppt"
                  label="accomodation"
                  variant="outlined"
                  value={selectedAppt}
                  onChange={(e) => handleSelect(e)}
                >
                    {userAppts.map(appt=>{
                        return(
                            <MenuItem value={appt.appt_id}>{appt.name}</MenuItem>
                        )
                    })}
                </Select>
                </FormControl>

          <CustomCalendar
           selectedApartment={selectedAppt} 
           events={rentals}
           apptNames = {apptNames}
           clientNames = {clientNames}
           apptCharges = {apptCharges} />
           </div>
          
          <Container className="custom-container">
            <div id='next'>Next Arrivals/Departures </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="events-list">
                  {combinedEvents.length>0 && combinedEvents.map((event) => (
                    <div key={event.id} className={`event ${event.type}`}>
                      {event.type === "arrival" ? (
                        <FlightLandIcon />
                      ) : (
                        <FlightTakeoffIcon />
                      )}{" "}
                      {event.type === "arrival" ? "Arrival" : "Departure"} on{" "}
                     <strong> {new Date(event.date).toLocaleDateString()}</strong>, in {" "}
                      <strong>{apptNames[event.appt_id] || ""}</strong>, by {" "}
                      {clientNames[event.client_id] || ""} || {<NightsStayIcon fontSize = '10px'/>} {((new Date(event.departure) - new Date(event.arrival)) / (1000 * 60 * 60 * 24))} ||{<AttachMoneyIcon fontSize = '10px'/>} {((new Date(event.departure) - new Date(event.arrival)) / (1000 * 60 * 60 * 24)) * event.price_per_night} {event.currency}
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Container>
          </section>
        </>
      ) : (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="column">
            <Grid item>
              <Typography variant="h3" align="center" gutterBottom>
                Welcome to StayCareTaker
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" paragraph>
                <strong>StayCareTaker</strong> is an application for apartments'
                owners. It helps you to manage seasonal rental by grouping all
                the reservations in one place. You can add clients and rentals,
                track expenses, and monitor your earnings.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" paragraph>
                Want to give it a try? Please <strong>register</strong>.
                Already a member? <strong>Log in</strong> to access your
                informations.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginRight: "20px" }}
                onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button
                variant="contained"
                color="info"
                size="large"
                onClick={() => navigate("/login")}>
                Log In
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Home;
