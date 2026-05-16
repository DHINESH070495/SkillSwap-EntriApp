import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Send,
  MessageCircle,
} from "lucide-react";

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
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })

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

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/30">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-5 flex items-center gap-4 text-white">

          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">

            <MessageCircle size={24} />

          </div>

          <div>

            <h1 className="text-xl font-bold">
              SkillSwap Chat
            </h1>

            <p className="text-sm text-indigo-100">
              Connect and collaborate instantly
            </p>

          </div>

        </div>

        {/* MESSAGES */}

        <div className="h-[500px] overflow-y-auto px-6 py-5 bg-gradient-to-b from-gray-50 to-white space-y-4">

          {messages.length === 0 && (

            <div className="h-full flex flex-col items-center justify-center text-gray-400">

              <MessageCircle size={50} />

              <p className="mt-3 text-lg">
                No messages yet
              </p>

              <span className="text-sm">
                Start the conversation 👋
              </span>

            </div>

          )}

          {messages.map((msg, i) => {

            const isMe =
              msg.senderId?.toString() ===
              currentUser.id.toString();

            return (

              <div
                key={i}
                className={`flex ${
                  isMe
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md relative transition-all duration-300
                  
                  ${
                    isMe
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                  }
                  
                  `}
                >

                  <p className="break-words">
                    {msg.text}
                  </p>

                  <div
                    className={`text-[11px] mt-2 text-right
                    ${
                      isMe
                        ? "text-indigo-100"
                        : "text-gray-400"
                    }
                    `}
                  >

                    {msg.time}

                  </div>

                </div>

              </div>

            );

          })}

          {/* Scroll Target */}
          <div ref={messagesEndRef} />

        </div>

        {/* INPUT AREA */}

        <div className="p-4 bg-white border-t border-gray-100">

          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-2 shadow-inner">

            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}

              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
            >

              <Send size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Chat;