import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WeeklyCalendar.css';

const WeeklyCalendar = ({ selectedDays, onDayChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDayChange = (newDate) => {
    setDate(newDate);
    const day = newDate.toLocaleDateString('en-US', { weekday: 'long' });
    onDayChange(day);
  };

  return (
    <div className="weekly-calendar">
      <p>Select a Day of the Week:</p>
      <Calendar
        onChange={handleDayChange}
        value={date}
        view="month"
        className="calendar"
      />
    </div>
  );
};

export default WeeklyCalendar;
