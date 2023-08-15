import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ChargesGraph = ({ apartmentEvents, charges }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Create an array to store monthly data
  const monthlyData = Array(12).fill().map(() => ({
    name: "",
    earnings: 0,
    charges: 0,
    balance: 0,
  }));

  // Loop through apartmentEvents to calculate earnings for each month
  apartmentEvents.forEach((event) => {
    const eventDate = new Date(event.arrival);
    const month = eventDate.getMonth();
    const earnings = parseFloat(event.price_per_night) * ((new Date(event.departure) - new Date(event.arrival)) / (1000 * 60 * 60 * 24));
    monthlyData[month].name = new Date(currentYear, month).toLocaleString("en-US", { month: "long" });
    monthlyData[month].earnings += earnings;
    monthlyData[month].balance += earnings;
  });

  // Loop through charges to calculate charges for each month
  charges.forEach((charge) => {
    const chargeDate = new Date(charge.date);
    const month = chargeDate.getMonth();
    monthlyData[month].name = new Date(currentYear, month).toLocaleString("en-US", { month: "long" });
    monthlyData[month].charges += parseFloat(charge.amount);
    monthlyData[month].balance -= parseFloat(charge.amount);
  });

  return (
    <>
      <h3>Balance</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#82ca9d" barSize={30} />
          <Bar dataKey="charges" fill="#8884d8" barSize={30} />
          <Bar dataKey="balance" fill="#ffc658" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChargesGraph;
