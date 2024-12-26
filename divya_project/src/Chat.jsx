import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './App.css';

import { id, i, init } from "@instantdb/react";



const APP_ID = "1a3ca935-0836-4123-935e-5cfc895226b5";


// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    todos: i.entity({
      text: i.string(),
      done: i.boolean(),
      createdAt: i.number(),
      contactId : i.any(),
      reactions:i.any()
    }),
  },
});



const db = init({ appId: APP_ID, schema });




const Chat = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [contacts, setContacts] = useState(["Divya", "Dnyaun", "Sakshi", "Pratik", "Omkar", "Umesh", "Ajit"]);
  // const [contacts, setContacts] = useState([
  //   { name: "Divya", online: true },
  //   { name: "Dnyaun", online: false },
  //   { name: "Sakshi", online: true },
  //   { name: "Pratik", online: false },
  //   { name: "Omkar", online: true },
  //   { name: "Umesh", online: false },
  //   { name: "Ajit", online: true },
  // ]);
  
  const [selectedMessage, setSelectedMessage] = useState(null); // Message to forward
  const [forwardModalVisible, setForwardModalVisible] = useState(false); // Forward modal visibility
  const [selectedMessageForReaction, setSelectedMessageForReaction] = useState(null);
  const query = {
    todos: {
      $: {
        where: {
          contactId: contactId,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery( query );

  console.log(data,'data');
  
  useEffect(() => {
    const fetchMessages = async () => {
      
      
      setMessages(data?.todos);
      console.log(messages,'message');
      
    };

    fetchMessages();
  }, [data?.todos]);

  


  const sendMessage = async () => {
    if (newMessage.trim()){
      const messageText = newMessage;
      addMessage(messageText, 'You')
    }
    setNewMessage('')
    addTodo(newMessage);
  
  };
  const addMessage = (message, sender) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, sender: sender }
    ]);
  };

  const deleteMessage = async (messageId) => {
    // Remove from database
    await db.transact(db.tx.todos[messageId].delete());

    // Remove from local state
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };


  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


    
  // Handle emoji click
  const insertEmoji = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false); // Hide the emoji picker after selecting an emoji
  };

  const forwardMessage = async (toContactId) => {
    if (selectedMessage) {
      await db.transact(
        db.tx.todos[id()].update({
          text: selectedMessage.text,
          done: false,
          createdAt: Date.now(),
          contactId: toContactId,
        })
      );
      setForwardModalVisible(false);
      setSelectedMessage(null);
    }
  };

  const addReaction = async (messageId, reaction) => {
    const message = messages.find((msg) => msg.id === messageId);
    const updatedReactions = [...(message.reactions || []), reaction];

    await db.transact(
      db.tx.todos[messageId].update({
        reactions: updatedReactions,
      })
    );

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, reactions: updatedReactions } : msg
      )
    );

    setSelectedMessageForReaction(null); 
  };

  // const getContactStatus = (contactId) => {
  //   const contact = contacts.find((c) => c.name === contactId);
  //   return contact?.online ? "Online" : "Offline";
  // };

  const addTodo = async (text) => {
    console.log(text,'text');
    
    let res = await db.transact(
      db.tx.todos[id()].update({
        text,
        done: false,
        createdAt: Date.now(),
        contactId : contactId,
        reactions:[],
      })
    );
    console.log(res,'res');
    
    
  }


  return (
      <>
      <div className="container-fluid " >
        <div className="row">
        <div className="chat-window">
      <div className="chat-header d-flex align-items-center">
        <div className="d-flex align-items-center">
          <img src="https://via.placeholder.com/40" alt="Chat" className="rounded-circle me-2"/>
          <span>{contactId}</span>
          {/* <span
                  className={`ms-2 badge ${
                    getContactStatus(contactId) === "Online"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {getContactStatus(contactId)}
                </span> */}
          <i className="fa-solid fa-ellipsis-vertical"></i>
          

          
        </div>
        <i className="bi bi-three-dots"></i>
      </div>
      <div className="chat-messages">
        <div className="message sent">
        {messages && messages.map((msg)=>(
        <div class="dropdown" key={msg.id}>
            <a class="btn btn-secondary dropdown-toggle mt-2"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>{msg.sender}</strong> {msg.text}
            </a>
          
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item"  onClick={() => deleteMessage(msg.id)}>delete</a></li>
              <li><a class="dropdown-item" onClick={() => {
                          setSelectedMessage(msg);
                          setForwardModalVisible(true);
                        }} >Forword</a></li>
              <li><a class="dropdown-item" onClick={() => setSelectedMessageForReaction(msg)} href="#">React</a></li>
            </ul>
            <div className="reactions">
                    {msg.reactions &&
                      msg.reactions.map((reaction, index) => (
                        <span key={index} className="reaction">
                          {reaction}
                        </span>
                      ))}
                  </div>
        </div>
        
        ))}
      
           {/* {messages && messages.map((msg)=>(
            <div key={msg.id}>
              <strong>{msg.sender}</strong> <p>{msg.text}</p>
              <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => deleteMessage(msg.id)}
                >
                  Delete
                </button>
            </div>
          ))} */}
        </div>
        
        {/* <div className="message received">
          <p>I’m good, thanks! What about you?</p>
        </div> */}
      </div>
      <div className="chat-input">
        <input type="text" className="form-control" placeholder="Type a message" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
        
        <button class="btn btn-success" id="sendMessageBtn"  onClick={sendMessage} type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
          </button>
          
<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={toggleEmojiPicker}>
  😊
</button>


{showEmojiPicker && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pick an Emoji</h5>
                <button type="button" className="btn-close" onClick={toggleEmojiPicker}></button>
              </div>
              <div className="modal-body d-flex gap-2">
                {['😀', '😁', '😂', '😎', '😍'].map(emoji => (
                  <button key={emoji} className="emoji btn btn-light" onClick={() => insertEmoji(emoji)}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
        </div>
      </div>

      {forwardModalVisible && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forward Message</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setForwardModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Select a contact to forward the message:</p>
                {contacts.map((contact) => (
                  <button
                    key={contact}
                    className="btn btn-primary me-2"
                    onClick={() => forwardMessage(contact)}
                  >
                    {contact}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

{selectedMessageForReaction && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">React to Message</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMessageForReaction(null)}
                ></button>
              </div>
              <div className="modal-body d-flex gap-2">
                {["👍", "❤️", "😂", "😮", "😢", "😡"].map((emoji) => (
                  <button
                    key={emoji}
                    className="btn btn-light"
                    onClick={() =>
                      addReaction(selectedMessageForReaction.id, emoji)
                    }
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </>




    // <div>
    //   <h2>Chat with {contactId}</h2>
    //   <div className="messages">
    //     {messages.map((msg) => (
    //       <div key={msg.id}>
    //         <strong>{msg.sender}:</strong> {msg.text}
    //       </div>
    //     ))}
    //   </div>
    //   <input
    //     type="text"
    //     value={newMessage}
    //     onChange={(e) => setNewMessage(e.target.value)}
    //     placeholder="Type a message"
    //   />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
};

export default Chat;
