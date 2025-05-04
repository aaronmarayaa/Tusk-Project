
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function Navigation() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLoginVisible();
    setIsSignUpVisible();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
        credentials: 'include'
      });
      if(response.ok) {
        setIsLoginVisible(false);
        console.log('Sign Up successful');
      } else {
        console.log('Sign Up failed');
      } 
    } catch(error) {
      console.log(error);
    } finally {
      setUserName('');
      setEmail('');
      setPassword('');
    } 
    setIsSignUpVisible(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/login', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({ email, username, password }),
          credentials: 'include',
        });
        if(response.ok) {
          setIsLoginVisible(true);
          console.log('Login successful');
        } else {
          console.log('Login failed')
        }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="flex w-full justify-between items-center p-4 " 
    style={{ 
      background: 'transparent',
    }}
    >

      <div className="flex items-center">
        <Link href="/" className="text-white text-lg font-bold mr-4" title='Chatbot of your needs'>Tusk AI</Link>
       
        <button className="text-sm text-white border border-purple-500 px-6 py-1 rounded hover:bg-purple-900/50 transition-colors">
          New Chat
        </button>
      </div>

      {/* Navigation buttons aligned to the right */}
      <div className="flex space-x-4 justify-end">
        {/* Conditionally render buttons based on form visibility */}

        {!isLoginVisible && !isSignUpVisible && (<>
          <button onClick={() => setIsSignUpVisible(true)}
                  className="text-sm text-white border border-purple-500 px-3 py-1 rounded hover:bg-purple-900/50 transition-colors">
            Sign Up
          </button>
          <button onClick={() => setIsLoginVisible(true)}
                  className="text-sm text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition-colors">
            Log In
          </button>
        </>)}

          {(isLoginVisible || isSignUpVisible) && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-purple-900/50">
                {isSignUpVisible && (
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
                    <div>
                    <input 
                        type="text" 
                        placeholder="Enter your Name" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-gray-800 border border-purple-900/50 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Example@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800 border border-purple-900/50 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full"
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        placeholder="Enter your Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800 border border-purple-900/50 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-purple-600 text-white rounded-md px-3 py-2 hover:bg-purple-700 transition-colors w-full"
                    >
                      Sign Up
                    </button>
                    <button 
                      onClick={() => setIsSignUpVisible(false)}
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}

              {isLoginVisible && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Example@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-gray-800 border border-purple-900/50 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full"
                    />
                  </div>
                  <div>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border border-purple-900/50 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-full"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-purple-600 text-white rounded-md px-3 py-2 hover:bg-purple-700 transition-colors w-full"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setIsLoginVisible(false)}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
