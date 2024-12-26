import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    
    setContacts(["Divya", "Dnyaun", "Sakshi","Pratik","Omkar","Umesh","Ajit"]);
  }, []);

  return (
    <>
    <div className="container-fluid">
        <div className="row">
          <div className=" sidebar">
            <div className="sidebar-header">
              <h3>Chats</h3>
              <i className="fa-solid fa-ellipsis-vertical"></i>
              
            </div>
            
            <div>
            {contacts.map((contact,index)=>(
            <ul className="chat-list" style={{listStyleType:"none",marginLeft:"0px", padding:"0px"}}> 
            <Link to={`/chat/${contact}`} className="link">
                  <li className="chat-list-item d-flex align-items-center" key={index}>
                  <img src="https://via.placeholder.com/40" alt="Chat"/>
                  
                  <div>
                      <h6 className="mb-0">{contact}</h6>
                      <small className="text-muted">Hey, are you there?</small>
                    </div>
                  
                    
                  </li>
                  </Link>
              
            </ul>
             ))}
            </div>
            
          </div>

        </div>

    </div>
    </>
    // <ul>
    //   {contacts.map((contact, index) => (
    //     <li key={index}>
    //       <Link to={`/chat/${contact}`}>{contact}</Link>
    //     </li>
    //   ))}
    // </ul>
  );
};

export default ContactList;
