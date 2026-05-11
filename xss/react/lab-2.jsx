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

  // Manual innerHTML (Works reliably)
  useEffect(() => {
    const innerBox = document.getElementById('inner-box');
    if (innerBox) innerBox.innerHTML = userInput;
  }, [userInput]);

  // Manual outerHTML (Works but tricky)
  useEffect(() => {
    const outerBox = document.getElementById('outer-box');
    if (outerBox && userInput) {
      try {
        // Save the id before replacing
        const parent = outerBox.parentNode;
        const newHTML = `<div id="outer-box" style="border: 2px solid purple; padding: 20px; min-height: 80px; background: #f3e8ff;">${userInput}</div>`;
        
        outerBox.outerHTML = newHTML;
      } catch (err) {
        console.log("outerHTML error:", err);
      }
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React XSS Test - outerHTML</h1>
      <p>Try this payload: <code>&lt;img src=x onerror=alert(1)&gt;</code></p>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Type or paste XSS payload"
        style={{ width: '600px', padding: '12px', fontSize: '17px' }}
      />

      <h2>1. innerHTML (Most Reliable)</h2>
      <div 
        id="inner-box"
        style={{ 
          border: '2px solid orange', 
          padding: '20px', 
          minHeight: '100px',
          backgroundColor: '#fffbeb'
        }}
      />

      <h2>2. outerHTML (Test This)</h2>
      <div 
        id="outer-box"
        style={{ 
          border: '2px solid purple', 
          padding: '20px', 
          minHeight: '100px',
          backgroundColor: '#f3e8ff'
        }}
      />

      <h2>3. dangerouslySetInnerHTML (React Way)</h2>
      <div 
        style={{ 
          border: '2px solid red', 
          padding: '20px', 
          minHeight: '100px',
          backgroundColor: '#fff0f0'
        }}
        dangerouslySetInnerHTML={{ __html: userInput }}
      />

      <div style={{ marginTop: '40px', padding: '15px', background: '#eee' }}>
        <strong>Why outerHTML is tricky?</strong><br/>
        • It replaces the entire element (including the old div)<br/>
        • React can lose track of the element<br/>
        • Sometimes needs page refresh to work properly
      </div>
    </div>
  );
}

export default App;
