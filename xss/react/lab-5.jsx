import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const linkRef = useRef(null);

  // Load from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserInput(params.get('q') || '');
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Method 4: Using ref + setAttribute
  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.setAttribute('href', userInput);
    }
  }, [userInput]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Multiple Ways to Set href in React</h1>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="javascript:alert(1) or other payload"
        style={{ width: '600px', padding: '12px', fontSize: '16px' }}
      />

      <h2>1. Direct in JSX (Most Common)</h2>
      <a href={userInput} style={linkStyle}>
        1. Direct href={'{userInput}'}
      </a>

      <h2>2. Using Variable</h2>
      <a href={userInput} style={linkStyle}>
        2. Using Variable
      </a>

      <h2>3. Using Template Literal</h2>
      <a href={`${userInput}`} style={linkStyle}>
        3. Template Literal
      </a>

      <h2>4. Using ref + setAttribute (Imperative)</h2>
      <a ref={linkRef} style={linkStyle}>
        4. ref + setAttribute
      </a>

      <h2>5. Spread Props</h2>
      <a {...{ href: userInput }} style={linkStyle}>
        5. Spread Props
      </a>

      <h2>6. Using dangerouslySetInnerHTML (Advanced)</h2>
      <div 
        dangerouslySetInnerHTML={{ 
          __html: `<a href="${userInput}" style="color:red; font-size:18px;">6. Via dangerouslySetInnerHTML</a>` 
        }} 
      />

      <style>{`
        a { display: block; margin: 15px 0; padding: 12px; border: 2px solid #ccc; }
      `}</style>
    </div>
  );
}

const linkStyle = {
  display: 'block',
  padding: '12px',
  background: '#ff4444',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  margin: '10px 0'
};

export default App;
