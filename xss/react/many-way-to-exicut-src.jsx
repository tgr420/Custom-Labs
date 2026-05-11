import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const iframeRef1 = useRef(null);
  const iframeRef2 = useRef(null);

  // Load from URL ?q=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setUserInput(q);
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Update URL
  useEffect(() => {
    const url = new URL(window.location.href);
    if (userInput) {
      url.searchParams.set('q', userInput);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }, [userInput]);

  // Method 4: Using ref + setAttribute
  useEffect(() => {
    if (iframeRef1.current) {
      iframeRef1.current.setAttribute('src', userInput);
    }
    if (iframeRef2.current) {
      iframeRef2.current.src = userInput;   // Direct property assignment
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔴 iframe src XSS Test - Multiple Ways</h1>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Try: javascript:alert(1)  or  data:text/html,<script>alert(1)</script>"
        style={{ width: '700px', padding: '12px', fontSize: '16px' }}
      />

      <p><strong>Best Payloads:</strong> <code>javascript:alert(1)</code> &nbsp; | &nbsp; <code>data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;</code></p>

      <h2>1. Direct in JSX (Most Common)</h2>
      <iframe
        src={userInput}
        style={{ width: '100%', height: '180px', border: '2px solid red' }}
        title="Method 1"
      />

      <h2>2. Using Variable</h2>
      <iframe
        src={userInput}
        style={{ width: '100%', height: '180px', border: '2px solid orange' }}
        title="Method 2"
      />

      <h2>3. Template Literal</h2>
      <iframe
        src={`${userInput}`}
        style={{ width: '100%', height: '180px', border: '2px solid purple' }}
        title="Method 3"
      />

      <h2>4. Using ref + setAttribute()</h2>
      <iframe
        ref={iframeRef1}
        style={{ width: '100%', height: '180px', border: '2px solid blue' }}
        title="Method 4"
      />

      <h2>5. Direct .src Property Assignment</h2>
      <iframe
        ref={iframeRef2}
        style={{ width: '100%', height: '180px', border: '2px solid green' }}
        title="Method 5"
      />

      <h2>6. Spread Props</h2>
      <iframe
        {...{ src: userInput }}
        style={{ width: '100%', height: '180px', border: '2px solid brown' }}
        title="Method 6"
      />

      <div style={{ marginTop: '40px', padding: '20px', background: '#ffe6e6', border: '1px solid red' }}>
        <strong>Tip:</strong> Try these payloads one by one:<br />
        1. <code>javascript:alert(1)</code><br />
        2. <code>data:text/html,&lt;script&gt;alert('XSS via data')&lt;/script&gt;</code><br />
        3. <code>javascript:alert(document.domain)</code>
      </div>
    </div>
  );
}

export default App;
