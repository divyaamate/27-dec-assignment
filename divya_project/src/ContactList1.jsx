import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const ContactList1 = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    
    setContacts(["Divya", "Dnyaun", "Sakshi", "Pratik", "Omkar", "Umesh", "Ajit"]);
  }, []);

  
  const filteredContacts = contacts.filter((contact) =>
    contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid" >
        <div className="row">
          <div className="sidebar">
            <div className="sidebar-header d-flex justify-content-between align-items-center">
              <h3>Chats</h3>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>

           
            <div className="search-bar mb-3 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

           
            <div>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <ul
                    className="chat-list"
                    style={{ listStyleType: "none", marginLeft: "0px", padding: "0px" }}
                    key={index}
                  >
                    <Link to={`/chat/${contact}`} className="link">
                      <li className="chat-list-item d-flex align-items-center">
                        <img src="https://via.placeholder.com/40" alt="Chat" />
                        <div className="ms-2">
                          <h6 className="mb-0">{contact}</h6>
                          <small className="text-muted">Hey, are you there?</small>
                        </div>
                      </li>
                    </Link>
                  </ul>
                ))
              ) : (
                <p className="text-muted">No contacts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactList1;
