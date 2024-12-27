import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './App.css';

import { id, i, init } from "@instantdb/react";



const APP_ID = "1a3ca935-0836-4123-935e-5cfc895226b5";



const schema = i.schema({
  entities: {
    todos: i.entity({
      text: i.string(),
      done: i.boolean(),
      createdAt: i.number(),
      contactId : i.any(),
      reactions:i.any(),
      image: i.any(),
    }),
  },
});



const db = init({ appId: APP_ID, schema });




const Chat = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null); 
  const [editedText, setEditedText] = useState(""); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [contacts, setContacts] = useState(["Divya", "Dnyaun", "Sakshi", "Pratik", "Omkar", "Umesh", "Ajit"]);
  const [contacts, setContacts] = useState([
    { name: "Divya", online: true },
    { name: "Dnyaun", online: false },
    { name: "Sakshi", online: true },
    { name: "Pratik", online: false },
    { name: "Omkar", online: true },
    { name: "Umesh", online: false },
    { name: "Ajit", online: true },
  ]);
  
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [forwardModalVisible, setForwardModalVisible] = useState(false); 
  const [selectedMessageForReaction, setSelectedMessageForReaction] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [chatOption , setChatOption] = useState(true);
  const [imgurl , setImgurl] = useState('');
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
   
    await db.transact(db.tx.todos[messageId].delete());

   
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };
  const clearChat = async () => {
    const messageIds = messages.map((msg) => msg.id);
    if (messageIds.length > 0) {
      await db.transact(messageIds.map((id) => db.tx.todos[id].delete()));
      setMessages([]);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


    
  const insertEmoji = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false); 
  };

  const forwardMessage = async (toContactId) => {
    if (selectedMessage) {
      const res = await db.transact(
        db.tx.todos[id()].update({
          text: selectedMessage.text,
          done: false,
          createdAt: Date.now(),
          contactId: toContactId,
        })
      );
      console.log(res,'res');
      
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

  const getContactStatus = (contactId) => {
    const contact = contacts.find((c) => c.name === contactId);
    return contact?.online ? "Online" : "Offline";
  };

  const startEditing = (message) => {
    setEditingMessage(message.id);
    setEditedText(message.text);
  };

  const saveEdit = async () => {
    await db.transact(
      db.tx.todos[editingMessage].update({
        text: editedText,
      })
    );
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editingMessage ? { ...msg, text: editedText } : msg
      )
    );
    setEditingMessage(null);
    setEditedText("");
  };


  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };


  const fetchPresignedUrl = async (fileType) => {
    const response = await fetch(
      `http://localhost:5000/upload?fileType=${fileType}`
    );

    const data = await response.json();

    return data;
  };




  const upload = async (files) => {

    const file = files[0];

    const data = await fetchPresignedUrl(file.type)

    fetch(data.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type, 
      },
    })
      .then(async (res) => {
        let url = res.url;
        setImgurl(url.split('?')[0]);

      })
      .catch((err) => {
      });

  };


  const addTodo = async (text) => {
    console.log(text,'text');
    console.log(imgurl,'imgurl');
    
    let res = await db.transact(
      db.tx.todos[id()].update({
        text,
        done: false,
        createdAt: Date.now(),
        contactId : contactId,
        reactions:[],
        image : imgurl || ''
      })
    );
    if(imgurl)
{
      setImgurl('');
      setChatOption(!chatOption);
}
    console.log(res,'res');
    
    
  }
  const handleOption = () => {
    setChatOption(!chatOption);
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
          <span
                  className={`ms-2 badge ${
                    getContactStatus(contactId) === "Online"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {getContactStatus(contactId)}
                </span>
          <i className="fa-solid fa-ellipsis-vertical" onClick={handleMenuToggle} style={{ cursor: 'pointer', fontSize: '24px' }}></i>
          {showMenu && (
        <div 
          style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: '10',
          }}
        >
          <ul style={{ listStyle: 'none', margin: '0', padding: '10px', color:"black" }}>
            <li style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={clearChat}>Clear Chat</li>
            
          </ul>
        </div>
      )}

          
        </div>
        <div>
        
        </div>
        
      </div>
      <div className="chat-messages">
      
        
        {messages.map((msg) => (
          <>
          {
           msg?.image &&  msg?.image != "" ? 

        <div className="image-div mt-5">
          <img src={msg?.image} alt="" style={{width:"30%", height:"100px"}}  />
        </div>
        :
          
            <div className="message sent" key={msg.id}>
              {editingMessage === msg.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button className="btn btn-success" onClick={saveEdit}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditingMessage(null)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <div className="dropdown" key={msg.id}>

                  <a className="btn btn-secondary dropdown-toggle mt-2"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <strong>{msg.sender}</strong> {msg.text}
                  </a>
                  {/* <div style={{height : 30 , width : 30}}><img src={imgurl} alt="" /></div> */}

                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item"  onClick={() => deleteMessage(msg.id)}>Delete</a></li>
                    <li><a className="dropdown-item" onClick={() => {
                                            setSelectedMessage(msg);
                                            setForwardModalVisible(true);
                                          }} >Forword</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedMessageForReaction(msg)} href="#">React</a></li>
                    <li><a className="dropdown-item"  onClick={() => startEditing(msg)} href="#">Edit</a></li>

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
                
              )}
            </div>
          }
          </>
          ))}
              <div style={{height : 30 , width : 30}}><img src={imgurl} alt="" /></div>

      </div>
      
      <div className="chat-input">
        
          <button onClick={handleOption} className="btn btn-light" style={{marginRight:"10px"}}>
            <i class="fa-solid fa-plus"></i>
          </button>
        {
          chatOption ? <input type="text" className="form-control ml-5" onKeyDown={(e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        }}  placeholder="Type a message" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>  :
           <><input type="file" onChange={(e) => upload(e.target.files)} />      
           </>

        }
        
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
                
                
                {typeof contacts}
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    className="btn btn-primary me-2"
                    onClick={() => forwardMessage(contact.name)}
                  >
                    {contact.name}
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




    
  );
};

export default Chat;
