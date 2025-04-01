import React, { useCallback, useEffect } from 'react';
import './App.scss';
import { FieldComponent } from './components/field/field.component';
import eventsToActionsService from './services/events-to-action.service';
import { useAppDispatch } from './store';
import { ScoreComponent } from './components/score/score.component';

const KEYDOWN_GLOBAL_LISTENER_KEY = 'evs-snake-keydown-listener';

function App() {
  const dispatch = useAppDispatch();

  const keyDownHandler = useCallback(
    (event: KeyboardEvent): void => {
      const action = eventsToActionsService.getKeyPressAction(event.code);
      if (action) {
        dispatch(action());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const isKeydownListenerRegistered: boolean =
      window.localStorage.getItem(KEYDOWN_GLOBAL_LISTENER_KEY) === JSON.stringify(keyDownHandler);

    if (!isKeydownListenerRegistered) {
      window.localStorage.removeItem(KEYDOWN_GLOBAL_LISTENER_KEY);
      document.addEventListener('keydown', keyDownHandler);
      window.localStorage.setItem(KEYDOWN_GLOBAL_LISTENER_KEY, JSON.stringify(keyDownHandler));
    }
  }, [keyDownHandler]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>SNAKE</h2>
        <ScoreComponent />
      </header>
      <FieldComponent />
    </div>
  );
}

export default App;
