import "./Index.css";
import Router from "./Router";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { auth } = useAuth();

  return (

      <Router />

  );
};

export default App;
