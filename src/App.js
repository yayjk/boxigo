import React, { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";
import Collapsible from "./components/collapsibleCard";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllData().then(data => setData(data.Customer_Estimate_Flow));
  }, []);

  const getAllData = async () => {
    let response = await fetch("http://boxigo.in/sampleAPI.php");
    return await response.json();
  };

  const jsx = [];

  for (var i = 0; i < data.length; i++) {
    jsx.push(<Collapsible key={i} id={i} {...data[i]} />);
  }

  return (
    <div className="App">
      <header>
        <h1 style={{ textAlign: "center" }}>Boxigo Assignment</h1>
      </header>
      <section id="wrapper">{jsx}</section>
      <footer>
        <h3 style={{ textAlign: "center" }}>By Jaskaran Singh</h3>
      </footer>
    </div>
  );
}

export default App;
