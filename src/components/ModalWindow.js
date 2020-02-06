import React, { useContext, useState } from 'react';
import './modalWindow.css';
import edit from '../imgs/icons/edit.png';
import rubbish from '../imgs/icons/rubbish.png';
import plus from '../imgs/icons/plus.png'
import {FirebaseContext} from '../context/firebase/firebaseContext';
import Form  from  './Form';


function ModalWindow({modal, close, dayEvents}) { 

  const firebase = useContext(FirebaseContext);

  const initialFormState = {
    date: modal.date,
    type: "other",
    title: "",
    details: "",
    time: "",
    action: ""   
  };      
  
  const [formState, setFormState] = useState(initialFormState); 
  const [formVisible, setFormVisible] = useState(false)
   
  const openForm = (form) => {    
    setFormState({...form, date: modal.date});    
    setFormVisible(true);  
  };  

  
  const closeForm = () => {
    setFormVisible(false);
    setFormState(initialFormState)
  }

  const remove = id => {
    firebase.removeEvent(id, modal.date);
  };

  const fullEvents = dayEvents
    ? dayEvents.map(event => {
        return (
          <div key={event.id} className="flex-container">
            <span className="full-event">
              <span style={{ fontWeight: "bold" }}>{event.title}. </span>
              {event.details}
              <span style={{ fontWeight: "bold", color: "red" }}>
                {" "}
                {event.time}
              </span>
            </span>

            <div className="buttons">
              <button
                className="button edit"
                onClick={() => openForm({
                    ...event,
                    action: "editEvent",
                    id: event.id })}
              >
                <img src={edit} alt="Ред" title="Редактировать" />
              </button>
              <button
                className="button remove"
                onClick={() => remove(event.id)}
              >
                <img src={rubbish} alt="Удал" title="Удалить" />
              </button>
            </div>
          </div>
        );
      })
    : null;

  return (
    <div className="curtain">
      <div className="info">
        {formVisible && <Form form={formState} close={closeForm} />}
        <h2 className="string-date">{modal.dateString}</h2>
        <br />

        {fullEvents}
        
        <button
          className="button plus"
          onClick={() => openForm({ ...formState, action: "addNewNote" })}
        >
          <img src={plus} alt="+" title="Добавить новое событие" />
        </button>
        <button className="modal button close" onClick={e => close(e)}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;