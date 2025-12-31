import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });

  const generatePassword = async () => {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ length, options })
    });

    const data = await res.json();
    setPassword(data.password);
  };

  return (
    <div className="container">
      <h2>🔐 Password Generator</h2>

      <input value={password} readOnly />

      <label>Password Length: {length}</label>
      <input type="range" min="6" max="30" value={length}
        onChange={(e) => setLength(e.target.value)} />

      {Object.keys(options).map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={options[key]}
            onChange={() =>
              setOptions({ ...options, [key]: !options[key] })
            }
          />
          {key}
        </label>
      ))}

      <button onClick={generatePassword}>Generate Password</button>
    </div>
  );
}

export default App;