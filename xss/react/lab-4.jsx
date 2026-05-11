import React, { useState, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');

  // Load from URL query parameter ?q=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setUserInput(q);
  }, []);

  // Update URL when input changes
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('q', value);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  };

  // ❌ Method 1: Using document.getElementById().innerHTML (Manual DOM manipulation)
  useEffect(() => {
    const resultDiv = document.getElementById('vulnerable-link');
    if (resultDiv) {
      resultDiv.textContent = userInput;     // ← This is what you wanted to test
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React XSS Testing - innerHTML vs dangerouslySetInnerHTML</h1>
      <p><strong>Try payload:</strong> <code>&lt;img src=x onerror=alert(1)&gt;</code></p>

      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Type XSS payload here"
          style={{
            padding: '12px',
            width: '500px',
            fontSize: '16px',
            border: '1px solid #333'
          }}
        />
      </div>

      <h2>1. Using document.getElementById().innerHTML (Manual)</h2>
      <a
        id="vulnerable-link"
        href={userInput}           // ← Direct user input in href (Vulnerable)
        style={{
          display: 'inline-block',
          padding: '15px 25px',
          backgroundColor: '#ff4444',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          margin: '20px 0'
        }}
      >
        Click Me (Dangerous Link)
      </a>

      <h2>2. Using dangerouslySetInnerHTML (React Official Way)</h2>
      <div
        style={{
          border: '2px solid red',
          padding: '20px',
          minHeight: '100px',
          backgroundColor: '#fff0f0'
        }}
        dangerouslySetInnerHTML={{ __html: userInput }}
      />

      <div style={{ marginTop: '40px', background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
        <strong>Testing Instructions:</strong>
        <ul>
          <li>Type or paste XSS payload in the input box</li>
          <li>Both boxes should execute the payload</li>
          <li>Also test with URL: <code>?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
        </ul>
        <p><strong>Note:</strong> The orange box uses <code>innerHTML</code> manually. The red box uses React's <code>dangerouslySetInnerHTML</code>.</p>
      </div>
    </div>
  );
}

export default App;
