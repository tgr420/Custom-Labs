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

  // Simple innerHTML (Stable)
  useEffect(() => {
    const inner = document.getElementById('inner-box');
    if (inner) inner.innerHTML = userInput;
  }, [userInput]);

  // ❌ Simple outerHTML with direct string (Unstable - for learning)
  useEffect(() => {
    const outer = document.getElementById('outer-box');
    if (outer && userInput) {
      try {
        outer.outerHTML = `
          <div id="outer-box" style="border: 2px solid purple; padding: 20px; min-height: 100px; background-color: #f3e8ff;">
            ${userInput}
          </div>
        `;
      } catch (err) {
        console.log("outerHTML error:", err);
      }
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>outerHTML - Simple but Unstable Version</h1>
      <p><strong>Test Payload:</strong> <code>&lt;img src=x onerror=alert(1)&gt;</code></p>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Type XSS payload here"
        style={{ width: '600px', padding: '12px', fontSize: '16px' }}
      />

      <h2>1. innerHTML (Stable & Reliable)</h2>
      <div 
        id="inner-box"
        style={{ border: '2px solid orange', padding: '20px', minHeight: '100px' }}
      />

      <h2>2. outerHTML Direct String (Unstable Version)</h2>
      <div 
        id="outer-box"
        style={{ border: '2px solid purple', padding: '20px', minHeight: '100px' }}
      />

      <h2>3. dangerouslySetInnerHTML (React Way)</h2>
      <div 
        style={{ border: '2px solid red', padding: '20px', minHeight: '100px' }}
        dangerouslySetInnerHTML={{ __html: userInput }}
      />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#ffe6e6', border: '1px solid red' }}>
        <strong>⚠️ Why this outerHTML version is unstable:</strong>
        <ul>
          <li>It completely removes and replaces the div</li>
          <li>After first replacement, React loses reference</li>
          <li>Sometimes you need to refresh the page to see updates</li>
          <li>Can cause React warnings in console</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
