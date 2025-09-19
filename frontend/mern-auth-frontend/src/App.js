import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
