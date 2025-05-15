import { Paperclip, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';

function MainContent() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(isLoginSuccessful) {
        fetchUser();
    }
}, [isLoginSuccessful]);

const analyzePdf = async (e) => {
      e.preventDefault();
      if (!pdfFile) return;
      setLoading(true);
      const newEntry = { question, answer: '...' };
      setChatHistory(prev => [...prev, newEntry]);
      setQuestion('')
      setMessage('');
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('question', question);
      try {
      const response = await fetch('https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/tusk/', { 
          method: 'POST', body: formData
      });
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();

      setChatHistory(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], answer: data.answer };
          return updated;
      });
      } catch (error) {
          console.error('Error:', error);
      } finally {
          setLoading(false);
      }
  };

  const fetchUser = async () => {
    try {
    const response = await fetch('https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/userHome', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
        setUser(data);
        setIsLoginSuccessful(true);
    } else {
        setIsLoginSuccessful(false);
        console.log("login failed")
    }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

  const handleInput = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'Auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative"
    style={{ background: "linear-gradient(0deg, rgba(65, 37, 89, 1) 0%, rgba(30, 17, 61, 1) 53%, rgba(13, 5, 31, 1) 100%)" }}>

      <div className='absolute top-0 w-full flex justify-between p-3'>
        <Navigation setIsLoginSuccessful={setIsLoginSuccessful} />
      </div>
        
      <div className="w-full max-w-2xl mt-20">
        {/* Chat container with fixed height and scrolling */}
        <div className="h-[calc(100vh-280px)] overflow-y-auto pr-4 custom-scrollbar">
          {/* Empty state illustration or chat history would go here */}
          {chatHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <div 
                className="w-24 h-24 cursor-pointer bg-purple-900 rounded-full flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300"
                onClick={() => {
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                  }
                }}
              >
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">How can I help you today?</h1>
              <p className="text-gray-400 mb-8">Ask anything or upload a file to get started</p>
            </div>
          )}

          {/* Chat History Display */}
          {chatHistory.length > 0 && (
            <div className="space-y-6">
              {chatHistory.map((entry, index) => (
                <div key={index} className="space-y-4">
                  {/* User Message */}

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>

                    <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-900/30">
                      <p className="text-white whitespace-pre-wrap">{entry.question}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-900/30">
                    {
                      console.log('Entry:', entry.question)
                     
                        }

                      <div className="prose prose-invert max-w-none">
                        <div className="text-white whitespace-pre-wrap leading-relaxed">
                          {entry.answer.split('\n').map((line, i) => (
                            <p key={i} className="mb-4 last:mb-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        

        {/* Input area - now fixed at bottom */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4">
          <div className="w-full max-w-2xl bg-gray-800/30 backdrop-blur-md rounded-2xl border border-purple-900/30 p-2 shadow-2xl transition-all duration-300 ease-in-out hover:bg-gray-800/40 focus-within:bg-gray-800/50 focus-within:scale-[1.02]">
            <form onSubmit={analyzePdf}>
              <div className="flex items-end">
                <div className="flex-grow flex items-center bg-gray-700/30 rounded-xl pr-2 transition-all duration-300 ease-in-out focus-within:bg-gray-700/40">
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(e) => 
                      setQuestion(e.target.value)
                    }
                    placeholder="Message Tusk AI..."
                    className="w-full bg-transparent text-white focus:outline-none resize-none max-h-32 py-3 px-4 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent transition-all duration-300 ease-in-out focus:scale-[1.02] placeholder-gray-500"
                    rows={1}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer p-2 text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out hover:scale-110">
                    <Paperclip className="w-5 h-5" />
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPdfFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                
                <button type="submit"
                  className={`ml-2 p-3 rounded-xl ${message ? 'bg-purple-600 hover:bg-purple-700 hover:scale-110' : 'bg-gray-600/50 cursor-not-allowed'} transition-all duration-300 ease-in-out cursor-pointer`}
                  disabled={!question}
                  
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-2 px-2 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Tusk AI may produce inaccurate information. Consider verifying important details.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MainContent;
