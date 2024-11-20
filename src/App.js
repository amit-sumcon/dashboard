import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router'; // Import AppRouter here

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <AppRouter setIsDarkMode={setIsDarkMode} />
      </Router>
    </div>
  );
}

export default App;
