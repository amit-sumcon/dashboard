import React from 'react';
import './index.css'
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Ensure you use PersistGate
import store, { persistor } from './redux/store';
import App from './App';


const root = createRoot(document.getElementById('root')); // Ensure 'root' is the correct id of your root element
root.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
