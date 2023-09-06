import React, { useState } from 'react';
import './App.css';
import StrengthCheck from './utilities/Strength.js'
import BreachCommonPassword from './utilities/BreachCommonPassword';

function Navbar() {
  return (
    <nav className='Navbar'>
      <div><h1>How Secure Is My Password</h1></div>
    </nav>
  );
}

function App() {
  const [value, setValue] = useState('');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [backgroundColor, setBGColor] = useState('#222eed');

  const firstOperation = (value) => {
    const strength = StrengthCheck(value);
    return strength;
  };

  const secondOperation = (value) => {
    return value;
  };

  const setBackground = (value) => {
    if (value === '') {
      return "#222eed";
    }

    const strength = StrengthCheck(value);
    
    if (strength.includes("second") || strength.includes("minute")) {
      return "#d63030";
    }
    else if (strength.includes("hour") || strength.includes("day") || strength.includes("week")) {
      return "#db7d3a";
    }
    else if (strength.includes("month")) {
      return "#ceb532";
    }
    else {
      return "#33c770";
    }

  };

  const onChange = (event) => {
    setValue(event.target.value);
    setResult1(firstOperation(event.target.value));
    setResult2(secondOperation(event.target.value));
    setBGColor(setBackground(event.target.value));
  };

  return (
    <div className='root' style={{backgroundColor}}>
      <Navbar />
      <div className='main-content'>
        <div className="App">
          <div className='container1'>
          <input className='password-input'
            type="text"
            placeholder="ENTER PASSWORD"
            value={value}
            onChange={onChange}
          />
          <p>
            It would take a computer
          </p>
          <p className='strengthResult'>
          {result1}
          </p>
          <p>
            to break your password
          </p>
          <div>
            <BreachCommonPassword password={result2}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
