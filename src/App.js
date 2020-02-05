import React from 'react';
import './App.css';

import Month from './components/Month';
import { FirebaseState } from './context/firebase/FirebaseState';


function App() {  

  return (
    <div className="App">     
        <FirebaseState>                        
            <Month />          
        </FirebaseState>
      
    </div>
  );
}

export default App;
