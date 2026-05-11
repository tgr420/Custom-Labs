import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function App() {
  const [userInput, setUserInput] = useState('');
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  // Load from URL and also sanitize
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setUserInput(q);
    
    // Important: Also sanitize when loading from URL
    const sanitized = DOMPurify.sanitize(q);
    setSanitizedHtml(sanitized);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const sanitized = DOMPurify.sanitize(value);
    setSanitizedHtml(sanitized);

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('q', value);
    window.history.replaceState({}, '', url);
  };

  // ==================== DANGEROUS SINKS ====================

  // 1. eval()
  useEffect(() => {
    if (sanitizedHtml) {
      try {
        eval(sanitizedHtml);
      } catch (e) {}
    }
  }, [sanitizedHtml]);

  // 2. new Function()
  useEffect(() => {
    if (sanitizedHtml) {
      try {
        const func = new Function(sanitizedHtml);
        func();
      } catch (e) {}
    }
  }, [sanitizedHtml]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>DOMPurify vs eval() / new Function()</h1>
      <p><strong>Test both ways:</strong></p>
      <p>1. Type in input</p>
      <p>2. Reload with <code>?q=alert(1)</code></p>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Try: alert(1) or alert('XSS')"
        style={{ width: '700px', padding: '12px', fontSize: '17px', marginBottom: '20px' }}
      />

      <h2>1. DOMPurify Sanitized Output</h2>
      <div
        style={{
          border: '2px solid green',
          padding: '20px',
          minHeight: '80px',
          background: '#e6ffe6'
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      <h2>2. eval() Sink</h2>
      <div style={{ border: '2px solid red', padding: '20px', minHeight: '80px', background: '#fff0f0' }}>
        eval() is running...
      </div>

      <h2>3. new Function() Sink</h2>
      <div style={{ border: '2px solid red', padding: '20px', minHeight: '80px', background: '#fff0f0' }}>
        new Function() is running...
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#ffe6e6', border: '1px solid red' }}>
        <strong>Current userInput:</strong> {userInput || 'Nothing'}<br />
        <strong>Current sanitizedHtml:</strong> {sanitizedHtml || 'Nothing'}
      </div>
    </div>
  );
}

export default App;
