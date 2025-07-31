import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f0f4ff 60%, #c3d1ff 100%)',
      borderRadius: '2rem',
      boxShadow: '0 6px 32px rgba(28, 90, 184, 0.1)',
      padding: '2.5rem',
      marginTop: '4rem',
      maxWidth: '350px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2 style={{
        fontFamily: "'Montserrat', Arial, sans-serif",
        fontSize: '2.5rem',
        color: '#3052a0',
        marginBottom: '36px'
      }}>
        Count: <span style={{ color: '#f99c3c' }}>{count}</span>
      </h2>
      <div style={{ display: 'flex', gap: '18px' }}>
        <button
          onClick={decrement}
          style={{
            padding: '0.75rem 1.4rem',
            background: '#eb6060',
            border: 'none',
            borderRadius: '1.7rem',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1.06rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(235,96,96,0.12)',
            transition: 'background 0.2s'
          }}
        >−</button>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.4rem',
            background: '#828df8',
            border: 'none',
            borderRadius: '1.7rem',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1.06rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(130,141,248,0.10)',
            transition: 'background 0.2s'
          }}
        >Reset</button>
        <button
          onClick={increment}
          style={{
            padding: '0.75rem 1.4rem',
            background: '#55bb5f',
            border: 'none',
            borderRadius: '1.7rem',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1.06rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(85,187,95,0.13)',
            transition: 'background 0.2s'
          }}
        >+</button>
      </div>
    </div>
  );
};

export default Counter;
