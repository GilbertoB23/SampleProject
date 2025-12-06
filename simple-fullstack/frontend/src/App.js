import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Fetch error", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + Node Full Stack Example</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
