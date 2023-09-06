import React, { useState } from 'react';
import crypto from 'crypto-js';
import { useEffect } from 'react';

const BreachCommonPassword = ({ password }) => {
  const [result, setResult] = useState('');

  async function fetchData() {
    const hash = crypto.SHA1(password);
    const hexString = hash.toString().toUpperCase();

    const first5 = hexString.slice(0, 5);

    let response = await fetch(`https://api.pwnedpasswords.com/range/${first5}`);
    let data = (await response.text()).split("\r\n");

    for (let i in data) {
      if (data[i].slice(0, 35) === hexString.slice(5, 40)) {
        setResult(`This password occurs ${data[i].slice(data[i].indexOf(":") + 1, -1)} times in breaches`);
      }
    }

    if (!result || password === "") {
      setResult('Your password appears in no breaches');
    }
  }

  useEffect(() => {
    fetchData();
  }, [password]);

  return (
      <p>{result}</p>
  );
};

export default BreachCommonPassword;