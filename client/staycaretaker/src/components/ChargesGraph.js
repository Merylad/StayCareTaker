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
    const eventStart = new Date(event.arrival);
    const eventEnd = new Date(event.departure);
    const eventYear = eventStart.getFullYear();
  
    if (eventYear === selectedYear) {
      let currentMonth = eventStart.getMonth();
  
      while (currentMonth <= eventEnd.getMonth()) {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = (lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
        
        let days = 0;
  
        if (currentMonth === eventStart.getMonth() && currentMonth === eventEnd.getMonth()) {
          days = (eventEnd - eventStart) / (1000 * 60 * 60 * 24) + 1;
        } else if (currentMonth === eventStart.getMonth()) {
          days = (lastDayOfMonth - eventStart) / (1000 * 60 * 60 * 24) + 1;
        } else if (currentMonth === eventEnd.getMonth()) {
          days = (eventEnd - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
        } else {
          days = daysInMonth;
        }
        
        const earnings = parseFloat(event.price_per_night) * days;
        
        monthlyData[currentMonth].name = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long" });
        monthlyData[currentMonth].earnings += earnings;
        monthlyData[currentMonth].balance += earnings;
  
        currentMonth++;
      }
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
