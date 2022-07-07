import React from 'react';
import './App.scss';
import { Field } from './components/field/field';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>SNAKE</h2>
      </header>
      <Field></Field>
    </div>
  );
}

export default App;
