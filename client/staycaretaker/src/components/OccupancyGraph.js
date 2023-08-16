import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const OccupancyGraph = ({ apartmentEvents }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthlyOccupancyData = [];

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(selectedYear, month, 1);
    const lastDayOfMonth = new Date(selectedYear, month + 1, 0);

    let occupiedNights = 0;

    apartmentEvents.forEach((event) => {
      const eventArrival = new Date(event.arrival);
      const eventDeparture = new Date(event.departure);

      if (
        eventDeparture.getFullYear() >= selectedYear &&
        eventArrival <= lastDayOfMonth &&
        eventDeparture >= firstDayOfMonth
      ) {
        const startDate = eventArrival > firstDayOfMonth ? eventArrival : firstDayOfMonth;
        const endDate = eventDeparture < lastDayOfMonth ? eventDeparture : lastDayOfMonth;

        const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
        occupiedNights += nights;
      }
    });

    const daysInMonth = (lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24);
    const occupancyPercentage = (occupiedNights / daysInMonth) * 100;

    monthlyOccupancyData.push({
      name: new Date(selectedYear, month).toLocaleString("en-US", { month: "long" }),
      value: occupancyPercentage,
    });
  }

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  return (
    <>
      <h3>Occupancy</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={handlePrevYear}>&lt; </button>
        <h4 style={{ margin: "0 10px" }}>{selectedYear}</h4>
        <button onClick={handleNextYear}> &gt;</button>
      </div>
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
