import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ChargesGraph = ({ apartmentEvents, charges }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthlyData = Array(12).fill().map(() => ({
    name: "",
    earnings: 0,
    charges: 0,
    balance: 0,
  }));

  apartmentEvents.forEach((event) => {
    const eventDate = new Date(event.arrival);
    const month = eventDate.getMonth();
    const year = eventDate.getFullYear();

    if (year === selectedYear) {
      const earnings = parseFloat(event.price_per_night) * ((new Date(event.departure) - new Date(event.arrival)) / (1000 * 60 * 60 * 24));
      monthlyData[month].name = new Date(currentYear, month).toLocaleString("en-US", { month: "long" });
      monthlyData[month].earnings += earnings;
      monthlyData[month].balance += earnings;
    }
  });

  charges.forEach((charge) => {
    const chargeDate = new Date(charge.date);
    const month = chargeDate.getMonth();
    const year = chargeDate.getFullYear();

    if (year === selectedYear) {
      monthlyData[month].name = new Date(currentYear, month).toLocaleString("en-US", { month: "long" });
      monthlyData[month].charges += parseFloat(charge.amount);
      monthlyData[month].balance -= parseFloat(charge.amount);
    }
  });

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  return (
    <>
      <h3>Balance</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={handlePrevYear}>&lt; </button>
        <h4 style={{ margin: "0 10px" }}>{selectedYear}</h4>
        <button onClick={handleNextYear}> &gt;</button>
      </div>
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
