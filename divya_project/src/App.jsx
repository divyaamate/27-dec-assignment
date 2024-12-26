import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import ContactList from "./ContactList";
import ContactList1 from './ContactList1';

const App = () => (
  <Router>
    <div className="app">
      <div className="contacts">
        <ContactList1 />
      </div>
      <div className="chat">
        <Routes>
          <Route path="/chat/:contactId" element={<Chat />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
