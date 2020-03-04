import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Navigation from './navigation';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
