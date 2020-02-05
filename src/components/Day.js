import React, {useState} from 'react';
import ModalWindow from './ModalWindow';

function Day({day, monthName, year, monthNumber, dayEvents}) {
   
  const initialModalWindowState = {      
    date: new Date(year, monthNumber, day),
    dateString: `${day} ${monthName} ${year} г.`
  } 

  const [modalWindowState] = useState(initialModalWindowState); 
  const [modalWindowVisible, setModalWindowVisible] = useState(false);    
  
  const hideModalWindow = (event) => {    
    setModalWindowVisible(false);
    event.stopPropagation();   
  }

  let dayStyle = {background: "#fdf35e69"};

  if (dayEvents) {
    for(let event of dayEvents) {
      if(event.type === 'holiday') {
        dayStyle = {background: "#fdc55e69"}
      };
    }
  }  

  const titles = dayEvents ? dayEvents.map(event => {    
    return (      
      <div key={event.id + event.time}>{event.title}</div>
    )}) : null;
    
  if (titles && titles.length > 4) {
    titles.splice(3, (titles.length - 3), (<div key="bababa">&nbsp;. . . </div>));
  }
  
  return (
    <div 
      className="day"
      onClick={() => setModalWindowVisible(true)}
      style={dayStyle}
    >
      {modalWindowVisible && (<ModalWindow modal={modalWindowState} close={hideModalWindow} dayEvents={dayEvents}/>)}
      <span className="main-date">
        {day}
      </span>
      
        {titles ? (<div>{titles}</div>) : null}
      
    </div>
  )
}

export default Day;