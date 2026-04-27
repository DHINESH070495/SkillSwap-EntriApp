import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat() {

  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  // 🔹 Scroll to bottom
  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  };

  // 🔹 Load Messages
  useEffect(() => {

    const loadMessages = async () => {

      try {

        const res =
          await axios.get(
            `${API}/${currentUser.id}`
          );

        const myMessages =
          res.data.messages || [];

        // 🔹 Filter messages between users
        const filtered =
          myMessages.filter(
            (m) =>
              m.senderId?.toString() === id.toString() ||
              m.receiverId?.toString() === id.toString()
          );

        setMessages(filtered);

        setTimeout(scrollToBottom, 100);

      } catch (error) {

        console.error(
          "Load message error:",
          error
        );

      }

    };

    loadMessages();

    // 🔹 Auto refresh every 2 sec
    const interval =
      setInterval(loadMessages, 2000);

    return () =>
      clearInterval(interval);

  }, [id]);

  // 🔹 Send Message
  const sendMessage = async () => {

    if (text.trim() === "")
      return;

    const newMessage = {

      senderId:
        currentUser.id.toString(),

      receiverId:
        id.toString(),

      text: text.trim(),

      time:
        new Date().toLocaleTimeString()

    };

    try {

      // 🔹 Update sender
      const senderRes =
        await axios.get(
          `${API}/${currentUser.id}`
        );

      const senderMessages =
        senderRes.data.messages || [];

      await axios.put(
        `${API}/${currentUser.id}`,
        {
          ...senderRes.data,
          messages: [
            ...senderMessages,
            newMessage
          ]
        }
      );

      // 🔹 Update receiver
      const receiverRes =
        await axios.get(
          `${API}/${id}`
        );

      const receiverMessages =
        receiverRes.data.messages || [];

      await axios.put(
        `${API}/${id}`,
        {
          ...receiverRes.data,
          messages: [
            ...receiverMessages,
            newMessage
          ]
        }
      );

      // 🔹 Update UI instantly
      setMessages((prev) => [
        ...prev,
        newMessage
      ]);

      setText("");

      setTimeout(scrollToBottom, 100);

    } catch (error) {

      console.error(
        "Send message error:",
        error
      );

    }

  };

  return (

    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        Chat
      </h1>

      {/* Messages Box */}

      <div className="bg-gray-100 p-4 h-80 overflow-y-auto rounded-lg mb-4">

        {messages.length === 0 && (

          <p className="text-center text-gray-500">
            No messages yet
          </p>

        )}

        {messages.map((msg, i) => (

          <div
            key={i}
            className={`mb-2 ${
              msg.senderId?.toString() ===
              currentUser.id.toString()
                ? "text-right"
                : "text-left"
            }`}
          >

            <span className={`px-3 py-2 rounded-lg shadow inline-block max-w-xs
              
              ${
                msg.senderId?.toString() ===
                currentUser.id.toString()
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-black"
              }
              
            `}>

              {msg.text}

              <div className="text-xs opacity-70 mt-1">
                {msg.time}
              </div>

            </span>

          </div>

        ))}

        {/* Scroll Target */}
        <div ref={messagesEndRef} />

      </div>

      {/* Input Box */}

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }

          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}

          className="border p-2 flex-1 rounded-lg"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default Chat;