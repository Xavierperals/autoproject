import React from 'react';
import './App.scss';
import { AutoProjectForm } from './components/autoproject-form/AutoProjectForm';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';

function configureTheme(): Theme {
  return createMuiTheme({
    palette: {
      primary: {
        // main: '#69f0ae',
        main: '#00bfa5',
      },
      secondary: {
        // main: '#69f0ae',
        main: '#00bfa5',
      },
    },
  });
}

function App() {
  return (
    <div className="app">
      <div className="app-form-wrapper">
        <ThemeProvider theme={configureTheme()}>
          <AutoProjectForm/>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
