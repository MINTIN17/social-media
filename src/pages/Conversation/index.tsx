import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.scss";

interface UserData {
  username: string;
  email: string;
  image: string;
  _id: string;
}

interface ConversationData {
  id: string;
  sender: UserData;
  recipient: UserData;
}

interface Message {
  sender_id: string;
  receiver_id: string;
  content: string;
  sender_data: UserData;
  receiver_data: UserData;
}

const Conversation: React.FC = () => {
  const [conversation, setConversation] = useState<ConversationData[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { id } = useParams<{ id: string }>();
  const [conversationId, setConversationId] = useState<string>();
  const [recipient, setRecipient] = useState<UserData>();
  const [connection, setConnection] = useState<WebSocket>();
  const navigation = useNavigate();
  const fetchConversation = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(`${process.env.REACT_APP_link_server}/conversation`, {
        params: {
          user_id: userId,
        },
      });

      const conversations = res.data;
      setConversation(conversations);

      const currentConversation = conversations.find(
        (c: ConversationData) => c.id === id
      );

      if (currentConversation) {
        console.log(currentConversation)
        setConversationId(currentConversation.id);
        setRecipient(currentConversation.recipient);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleRecipientClick = async (conversation: ConversationData) => {
    navigation(`/message/${conversation.id}`)
    fetchConversation();
    const url = `${process.env.REACT_APP_link_server}/message/conversation`
    console.log(url)
    try {
      const res = await axios.get(
        url,
        {
          params: {
            id: conversation.id
          }
        }
      );
      console.log(res.data)
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    console.log(recipient?._id)
    axios
      .post(`${process.env.REACT_APP_link_server}/message`, {
        sender_id: localStorage.getItem("userId") || "",
        receiver_id: recipient?._id,
        conversation_id: id,
        content: message,
      })
      .then((res) => {
        // Update the message list with the new message
        setMessages((prevMessages) => [...prevMessages, res.data]);
        setMessage(""); // Clear the message input

        // Prepare the data to send over WebSocket
        const dataToSend = {
          ...res.data, // Include the data from the server response
          type: "privateMessage", // Add the type key
        };


        if (connection && connection.readyState === WebSocket.OPEN) {
          connection.send(JSON.stringify(dataToSend)); // Send the message to WebSocket
        }
      })
      .catch((err) => {
        console.log(err.response); // Handle any errors from the POST request
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchConversation(); // Wait for conversation data to be fetched
      const url = `${process.env.REACT_APP_link_server}/message/conversation`

      try {
        const res = await axios.get(
          url,
          {
            params: {
              id: id
            }
          }
        );
        console.log(res.data)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const wsConnection = new WebSocket('ws://localhost:5000');
    console.log(wsConnection)
    wsConnection.onopen = () => {
      setTimeout(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          wsConnection.send(
            JSON.stringify({ type: 'clientId', clientId: userId })
          );
        }
      }, 100);
    };


    wsConnection.onmessage = (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        console.log(data)
        const reader = new FileReader();
        reader.onload = () => {
          const msg = reader.result;
          
          if (msg && typeof msg === 'string') {
            const msgObj = JSON.parse(msg);
            setMessages((prevMessages) => [...prevMessages, msgObj]);
          } else {
            console.error('Failed to read message: result is not a valid string');
          }
        };
        reader.readAsText(data);
      } else {
        const msg = JSON.parse(data);
        if (msg.type === "privateMessage"){}
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };


    wsConnection.onclose = () => {
      console.log('Disconnected from server');
    };

    setConnection(wsConnection)

    return () => {
      if (wsConnection.readyState === WebSocket.OPEN) {
        wsConnection.close();
      }
    };
  }, []); // Dependencies include `conversationId` and `id`



  return (
    <div className="wrapper" style={{ display: "flex" }}>
      {/* Conversation List */}
      <div
        style={{
          width: "400px",
          borderRight: "1px solid #ddd",
        }}
      >
        {conversation && conversation.length > 0 ? (
          <div>
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={` ${msg.id === id ? "current-select" : "conversation_line"
                  }`}
                style={{
                  display: "flex",
                  gap: "15px",
                  fontSize: "20px",
                  alignItems: "center",
                  justifyItems: "center",
                  cursor: "pointer",
                  padding: "10px",
                }}
                onClick={() => handleRecipientClick(msg)}
              >
                <div>
                  <img className="avatar" src={msg.recipient.image !== "" ? msg.recipient.image : "/asset/img/avatar.jpg"} alt="Avatar" />
                </div>
                <div>{msg.recipient.username}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No conversation found.</p>
        )}
      </div>

      {/* Chat Place */}
      <div style={{ flex: 1, padding: "10px" }}>
        {id !== undefined && id !== null && id !== "" ? (
          <div className="wrapper">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender_id === localStorage.getItem("userId")?.toString()
                    ? "chat-message-sent"
                    : "chat-message-received"
                    }`}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {/* Avatar */}
                  {msg.sender_id !== localStorage.getItem("userId") && (
                    <img
                      src={
                        msg.sender_id === localStorage.getItem("userId")?.toString()
                          ? msg.receiver_data.image !== ""
                            ? msg.receiver_data.image
                            : "/asset/img/avatar.jpg"
                          : msg.sender_data.image !== ""
                            ? msg.sender_data.image
                            : "/asset/img/avatar.jpg"
                      }
                      alt="Avatar"
                      className="avatar"
                    />
                  )}

                  {/* Message Content */}
                  <div
                    style={{
                      background: msg.sender_id === localStorage.getItem("userId") ? "#d1e7dd" : "#f8f9fa",
                      padding: "10px 15px",
                      borderRadius: "15px",
                      maxWidth: "70%",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.sender_id === localStorage.getItem("userId") && (
                    <img
                      src={msg.sender_id !== localStorage.getItem("userId")?.toString()
                        ? msg.receiver_data.image : msg.sender_data.image}
                      alt="Avatar"
                      className="avatar"
                    />
                  )}
                </div>
              ))}
            </div>
            <div
              style={{

              }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Nhập tin nhắn"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        ) : (
          <p style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>Vui lòng chọn người để nhắn tin</p>
        )}
      </div>
    </div>
  );
};

export default Conversation;
