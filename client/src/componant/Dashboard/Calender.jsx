import React from 'react';

const Calendar = () => {
  return (
    <div>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
        style={{ border: '0', frameborder: '0', scrolling: 'no',width:"100%",height:"480px" }}
        
      ></iframe>
    </div>
  );
};

export default Calendar;
