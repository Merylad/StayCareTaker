import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const OccupancyGraph = ({ apartmentEvents }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const monthlyOccupancyData = [];

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(currentYear, month, 1);
    const lastDayOfMonth = new Date(currentYear, month + 1, 0);

    const occupiedNights = apartmentEvents.reduce((totalNights, event) => {
      const eventArrival = new Date(event.arrival);
      const eventDeparture = new Date(event.departure);

      if (
        eventArrival.getFullYear() === currentYear &&
        eventArrival.getMonth() === month
      ) {
        const startDate = eventArrival > firstDayOfMonth ? eventArrival : firstDayOfMonth;
        const endDate = eventDeparture < lastDayOfMonth ? eventDeparture : lastDayOfMonth;
        
        const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return totalNights + nights;
      }
      return totalNights;
    }, 0);

    const daysInMonth = (lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24);
    const occupancyPercentage = (occupiedNights / daysInMonth) * 100;

    monthlyOccupancyData.push({
      name: new Date(currentYear, month).toLocaleString("en-US", { month: "long" }),
      value: occupancyPercentage,
    });
  }

  return (
    <>
      <h3>Occupancy</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthlyOccupancyData}>
          <Bar dataKey="value" fill="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OccupancyGraph;
