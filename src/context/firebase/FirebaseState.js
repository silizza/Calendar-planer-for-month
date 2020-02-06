import React, { useState } from 'react';
import { FirebaseContext } from './firebaseContext';

const url = 'https://calendar-planner-528e9.firebaseio.com';

export const FirebaseState = ({children}) => {
  
  const [events, setEvents] = useState({});

  const fetchEvents = async () => {

    let res = {};

    res = await fetch(`${url}/.json`)
      .then(resolve => resolve.json())
      .catch(err => alert('Не удалось загрузить события.'));  

    setEvents(res); 
  }  
  
  const addEvent = async (type, title, details, time, date) => {

    const event = {type, title, details, time};
    
    await fetch(`${url}/${+date}.json`, {
      method: 'POST',
      body: JSON.stringify(event)
    })  
      .then(() => {        
        fetchEvents();
      })
      .catch(err => {
        throw err
      });
  }

  const editEvent = async (type, title, details, time, id, date) => {
    
    const event = {type, title, details, time};
    
    await fetch(`${url}/${+date}/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(event)
    })
      .then(() => {      
        fetchEvents();    
      })
    .catch(err => {
      throw err
    });
  }

  const removeEvent = async (id, date) => {
    await fetch(`${url}/${+date}/${id}.json`, {
      method: 'DELETE'})
      .then(() => {
        fetchEvents();
      })  
      .catch(err => alert('Ошибка сервера: не удалось удалить событие'));      
  }

  return (
    <FirebaseContext.Provider value={{
      addEvent, fetchEvents, events, removeEvent, editEvent
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}