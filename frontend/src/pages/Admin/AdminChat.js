import { useState, useEffect } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import "../../styles/chat.css";

export default function AdminChat({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && msg.trim()) {
      const message = {
        author: currentUser?.username || "Admin",
        text: msg,
        timestamp: Date.now(),
      };
      socket.send(JSON.stringify(message));
      setMsg("");
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
  	<div>
	  	<NavbarAdmin />
	    <div className="admin-chat">
	      <h2>💬 Chat administratorów</h2>
	      <div className="chat-box">
	        {messages.map((m, i) => (
	          <div
	            key={i}
	            className={`chat-message ${
	              m.author === currentUser?.username ? "mine" : "theirs"
	            }`}
	          >
	            <div className="msg-author">
	              {m.author} <span className="msg-time">{formatTime(m.timestamp)}</span>
	            </div>
	            <div className="msg-text">{m.text}</div>
	          </div>
	        ))}
	      </div>

	      <div className="chat-input">
	        <input
	          type="text"
	          value={msg}
	          onChange={(e) => setMsg(e.target.value)}
	          placeholder="Napisz wiadomość..."
	          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
	        />
	        <button onClick={sendMessage}>Wyślij</button>
	      </div>
	    </div>
	</div>
  );
}
