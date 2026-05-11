import React, { useState, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setUserInput(q);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  };

  // 1. eval()
  useEffect(() => {
    if (userInput) {
      try {
        eval(userInput);
      } catch (e) {}
    }
  }, [userInput]);

  // 2. setTimeout()
  useEffect(() => {
    if (userInput) {
      try {
        setTimeout(() => {
          // Using Function constructor inside for better execution
          new Function(userInput)();
        }, 100);
      } catch (e) {}
    }
  }, [userInput]);

  // 3. setInterval()
  useEffect(() => {
    if (userInput) {
      try {
        const id = setInterval(() => {
          new Function(userInput)();
        }, 1500);
        return () => clearInterval(id);
      } catch (e) {}
    }
  }, [userInput]);

  // 4. new Function()
  useEffect(() => {
    if (userInput) {
      try {
        const func = new Function(userInput);
        func();
      } catch (e) {}
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔴 React XSS Test - Execution Sinks</h1>
      <p><strong>Test Payload:</strong> <code>alert('XSS')</code> or <code>alert(1)</code></p>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Type payload here (e.g. alert(1))"
        style={{ width: '700px', padding: '12px', fontSize: '17px', marginBottom: '25px' }}
      />

      <h2>1. eval() Sink</h2>
      <div style={{ padding: '15px', border: '2px solid red', background: '#fff0f0', marginBottom: '15px' }}>
        eval() is running...
      </div>

      <h2>2. setTimeout() Sink</h2>
      <div style={{ padding: '15px', border: '2px solid orange', background: '#fffbeb', marginBottom: '15px' }}>
        setTimeout() is running...
      </div>

      <h2>3. setInterval() Sink</h2>
      <div style={{ padding: '15px', border: '2px solid purple', background: '#f3e8ff', marginBottom: '15px' }}>
        setInterval() is running... (may trigger multiple times)
      </div>

      <h2>4. new Function() Sink</h2>
      <div style={{ padding: '15px', border: '2px solid blue', background: '#f0f8ff' }}>
        new Function() is running...
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#ffe6e6', border: '1px solid red' }}>
        <strong>Tip:</strong> Try these payloads:<br />
        • <code>alert(1)</code><br />
        • <code>alert('XSS')</code><br />
        • <code>console.log('Executed!')</code><br />
        • <code>alert(document.domain)</code>
      </div>
    </div>
  );
}

export default App;
