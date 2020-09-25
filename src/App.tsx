import React from 'react';
import './App.scss';
import { AutoProjectForm } from './components/autoproject-form/AutoProjectForm';

function App() {
  return (
    <div className="app">
      <div className="app-form-wrapper">
        <AutoProjectForm/>
      </div>
    </div>
  );
}

export default App;
