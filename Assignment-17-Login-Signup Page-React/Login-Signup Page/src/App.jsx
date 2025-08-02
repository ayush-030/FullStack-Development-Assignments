import React from 'react';
import AuthPage from './AuthPage';

const App = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <AuthPage />
    </div>
  );
};

export default App;
