import { Paperclip, Send } from 'lucide-react';
import { useState, useRef } from 'react';

function MainContent() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 bg-gradient-to-b from-black to-gray-900">
      <div className="w-full max-w-2xl">
        {/* Empty state illustration or chat history would go here */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-24 h-24 bg-purple-900 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How can I help you today?</h1>
          <p className="text-gray-400 mb-8">Ask anything or upload a file to get started</p>
        </div>

        {/* Input area */}
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
                className={`ml-2 p-3 rounded-lg ${message ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'} transition-colors`}
                disabled={!message}
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
    </div>
  );
}

export default MainContent;
