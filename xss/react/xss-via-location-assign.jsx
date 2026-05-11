import React, { useState, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');

  // Load from URL ?q=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setUserInput(q);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const url = new URL(window.location.href);
    url.searchParams.set('q', value);
    window.history.replaceState({}, '', url);
  };

  // ==================== DANGEROUS NAVIGATION SINKS ====================

  const triggerLocationHref = () => {
    if (userInput) {
      try {
        window.location.href = userInput;        // Most Common Sink
      } catch (e) {}
    }
  };

  const triggerLocationReplace = () => {
    if (userInput) {
      try {
        window.location.replace(userInput);      // Does not create history entry
      } catch (e) {}
    }
  };

  const triggerLocationAssign = () => {
    if (userInput) {
      try {
        window.location.assign(userInput);
      } catch (e) {}
    }
  };

  const triggerWindowOpen = () => {
    if (userInput) {
      try {
        window.open(userInput);                  // Can be used for popup XSS
      } catch (e) {}
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔴 React XSS Test - Navigation Sinks</h1>
      <p><strong>Best Payloads:</strong></p>
      <ul>
        <li><code>javascript:alert(1)</code></li>
        <li><code>javascript:alert('XSS')</code></li>
        <li><code>javascript:alert(document.domain)</code></li>
        <li><code>data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
      </ul>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="javascript:alert(1)"
        style={{ 
          width: '700px', 
          padding: '12px', 
          fontSize: '17px', 
          marginBottom: '20px' 
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
        <button onClick={triggerLocationHref} style={btnStyle}>
          1. location.href =
        </button>

        <button onClick={triggerLocationReplace} style={btnStyle}>
          2. location.replace()
        </button>

        <button onClick={triggerLocationAssign} style={btnStyle}>
          3. location.assign()
        </button>

        <button onClick={triggerWindowOpen} style={btnStyle}>
          4. window.open()
        </button>
      </div>

      <h2>Current Value</h2>
      <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '6px', wordBreak: 'break-all' }}>
        <strong>userInput:</strong> {userInput || 'Empty'}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#ffe6e6', border: '1px solid red', borderRadius: '8px' }}>
        <strong>Testing Tips:</strong><br />
        • Type <code>javascript:alert(1)</code> and click any button<br />
        • Also test with direct URL: <code>?q=javascript:alert(1)</code><br />
        • window.open() may be blocked by popup blocker
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  background: '#ff4444',
  color: 'white',
  border: 'none',
  borderRadius: '6px'
};

export default App;
