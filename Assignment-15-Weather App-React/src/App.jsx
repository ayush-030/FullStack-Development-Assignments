// App.jsx
import React from 'react';
import Weather from './Weather';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#232323'
      }}
    >
      <Weather />
    </div>
  );
}

export default App;
