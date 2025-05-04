'use client';

import { Paperclip, Send, Plus, Bot } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Navigation from './navigation/page.js';

function MainContent() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = { id: Date.now(), text: message.trim(), sender: 'user' };
    setChat((prev) => [...prev, userMessage]);
    setMessage('');

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: `You said: "${userMessage.text}" 🤖`,
        sender: 'bot',
      };
      setChat((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleNewChat = () => {
    setChat([]);
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className='absolute top-0 w-full justify-between p-3'>
        <Navigation />
      </div>
      <div className="w-full max-w-2xl flex justify-between items-center text-white mb-6">
        <button onClick={handleNewChat} className="flex items-center gap-1 text-sm hover:text-purple-400 transition">
          <Plus className="w-4 h-4" /> New Chat
        </button>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <Bot className="w-4 h-4" />
          Chatbot
        </div>
      </div>

      <div className="w-full max-w-2xl mb-32">
        <div className="flex flex-col gap-4">
          {chat.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <div className="mb-4">💬 No messages yet</div>
              <div>Ask something or upload a file to get started!</div>
            </div>
          ) : (
            chat.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-4 py-3 rounded-xl ${
                  msg.sender === 'user'
                    ? 'self-end bg-purple-600 text-white'
                    : 'self-start bg-gray-700 text-gray-100'
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4">
        <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-1 shadow-lg">
          <div className="flex items-end">
            <div className="flex-grow flex items-center bg-gray-700/50 rounded-lg pr-2">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInput}
                placeholder="Message Tusk AI..."
                className="w-full bg-transparent text-white focus:outline-none resize-none max-h-32 py-3 px-4 scrollbar-thin scrollbar-thumb-gray-600"
                rows={1}
              />
              <label htmlFor="file-upload" className="cursor-pointer p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Paperclip className="w-5 h-5" />
                <input type="file" id="file-upload" className="hidden" />
              </label>
            </div>
            <button
              onClick={handleSend}
              className={`ml-2 p-3 rounded-lg ${message ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'} transition-colors`}
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 px-2">
            Tusk AI may produce inaccurate information. Consider verifying important details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
