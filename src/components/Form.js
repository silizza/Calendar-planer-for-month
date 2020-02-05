import React, {useState, useContext} from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';


function Form ({form, close}) {    
  
  const firebase = useContext(FirebaseContext);    

  const [type, setType] = useState(form.type);
  const [title, setTitle] = useState(form.title);
  const [details, setDetails] = useState(form.details);
  const [time, setTime] = useState(form.time);
  const action = form.action;
  
  const cleanForm = () => {
    setType('other');
    setTitle('');
    setDetails('');
    setTime('');
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();       
    
    let method;
    if (event.target.name === 'add') {
      method = () => firebase.addEvent(type, title, details, time, form.date); 
    } else {
      method = () => firebase.editEvent(type, title, details, time, form.id, form.date);
    }
    
    method()
      .then(() => {      
        cleanForm(); 
        close();  
      })
      .catch (err => {
        alert('Не удалось отправить запрос, попробуйте снова', err)
      })    
  }  

  return (
    <div className="form">
      <form>
        <div className="flex-container">
        <label>Тип </label>
        <select          
          value={type}
          onChange={e => setType(e.target.value)}>
          <option value="holiday">Праздник</option>
          <option value="meeting">Встреча</option>
          <option value="business">Дело</option>
          <option value="other">Другое</option>
        </select>
        </div>
        <br/>
        <div className="flex-container">
        <label>Название </label>
        <input
          type="text"
          maxLength="18"
          placeholder="Название события"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        </div>
        <br/>
        <div className="flex-container">
        <label>Подробности </label>
        <input
          type="text"
          placeholder="Подробности события"
          name="details"
          value={details}
          onChange={e => setDetails(e.target.value)}
        />
        </div>
        <br/>
        <div className="flex-container">
        <label>Время </label>
        <input 
          className="input-time"
          type="time"
          name="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        </div>
        <button 
          className="button close"
          onClick={close}
        >
          &times;
        </button>
        { action==='addNewNote' ? (
          <button 
            name="add"
            type="submit"
            className="button submit"
            onClick={handleSubmit}
          >Сохранить</button>)
        : (
          <button 
            name="edit"
            type="submit"
            className="button submit"
            onClick={handleSubmit}
          >Сохранить изменения</button>)
        }
          
        
      </form>
    </div>
  );
}

export default Form;