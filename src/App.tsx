import React from 'react';
import './App.scss';
import { Field } from './components/field/field';
import moveService from './services/move.service';
import { useDispatch } from 'react-redux';

const KEYDOWN_GLOBAL_LISTENER_KEY = 'evs-snake-keydown-listener';

function App() {
  const dispatch = useDispatch();

  function keyDownHandler(this: Document, event: KeyboardEvent): void {
    const action = moveService.getKeyPressAction(event.code);
    if (action) {
      dispatch(action());
    }
  }

  const isKeydownListenerRegistered: boolean =
    window.localStorage.getItem(KEYDOWN_GLOBAL_LISTENER_KEY) === JSON.stringify(keyDownHandler);

  if (!isKeydownListenerRegistered) {
    window.localStorage.removeItem(KEYDOWN_GLOBAL_LISTENER_KEY);
    document.addEventListener('keydown', keyDownHandler);
    window.localStorage.setItem(KEYDOWN_GLOBAL_LISTENER_KEY, JSON.stringify(keyDownHandler));
  }

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
