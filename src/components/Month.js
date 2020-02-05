import React, { useEffect, useContext } from 'react';
import Day from './Day';
import { FirebaseContext } from '../context/firebase/firebaseContext';


function Month() {

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  let {fetchEvents, events} = useContext(FirebaseContext);
  
  useEffect(() => {
    fetchEvents();      
  },[]);    

  const date = new Date(),  
    month = date.getMonth(),
    year = date.getFullYear();
  
  const monthName = monthNames[month];

  const d = new Date(year, month);  

  const days = [];  

  const week = dayNames.map(day => 
    <div className="week" key={dayNames.indexOf(day)}>{day}</div>
  )

  //empty elements for days of week before begining of month
  for (let i = 1; i < d.getDay(); i ++) {
    days.push(<div key={i}></div>);
  }

  while (d.getMonth() === month) {   
    
    let dayEvents = null;

    if (events) {
      
      dayEvents = events[+d] ? Object.keys(events[+d]).map(key =>  {
        return {
          ...events[+d][key],
          id: key
        }}) : null;        
    }

    //sort events by time
    if (dayEvents) {
      dayEvents.sort((prev, next) => {
        const time1 = (prev.time.slice(0, 2) + prev.time.slice(3, 5));
        const time2 = (next.time.slice(0, 2) + next.time.slice(3, 5));     
        
        return (time1 > time2);
      })
    }

    const m = (month === 2 || month === 7) 
              ? (monthName + 'а').toLowerCase() 
              : (monthName.slice(0, -1) + 'я').toLowerCase();

    days.push(<Day 
      key={d} 
      day={d.getDate()}
      monthName={m}
      monthNumber={month}      
      year={year}
      dayEvents={dayEvents}/>);
    
    d.setDate(d.getDate() + 1);
  }

  //empty elements for days of week after ending of the month
  if (days.length % 7) {
    let i = 7;
    while (days.length % 7) {
      days.push(<div key={i}></div>);
      i++;
    }
  }

  let gridStyle;
  
  //chek the size of grid
  if (days.length > 35) {
    gridStyle = {
      gridTemplateRows: "2fr 1fr repeat(6, 3fr)"
    };    
  } else {
    gridStyle = {
      gridTemplateRows: "2fr 1fr repeat(5, 3fr)"
    }; 
  }


  return (
    <div  className="calendar" style={gridStyle}>
      <div className="title">
        {monthName} {year} года
      </div>      
        {week}
        {days}      
    </div>
  )
}

export default Month;