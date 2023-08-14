import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const localizer = momentLocalizer(moment);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: "#E1F5FE", 
  borderRadius: theme.spacing(1),
  width : '70%',
  margin: '0 auto'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomCalendar = ({ selectedApartment, events, apptNames, clientNames }) => {
  const apartmentEvents = events.filter((event) => event.appt_id === selectedApartment);

  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="h5">
        {apptNames[selectedApartment]} Calendar
      </StyledTypography>
      <Calendar
        localizer={localizer}
        events={apartmentEvents.map((event) => ({
          title: clientNames[event.client_id],
          start: new Date(event.arrival),
          end: new Date(event.departure),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "300px" }} 
      />
    </StyledPaper>
  );
};

export default CustomCalendar;
