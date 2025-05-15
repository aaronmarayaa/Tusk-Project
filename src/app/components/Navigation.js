import Link from 'next/link';
import { useEffect, useState } from 'react';

function Navigation({ setIsLoginSuccessful }) {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Reset password error
    setPasswordError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password is not empty
    if (!password || !confirmPassword) {
      setPasswordError('Please fill in both password fields');
      return;
    }
  
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Reset password error
    setPasswordError('');
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password is not empty
    if (!password || !confirmPassword) {
      setPasswordError('Please fill in both password fields');
      return;
    }

    try {
      const response = await fetch('https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
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
      setConfirmPassword('');
    } 

    console.log('Sign Up attempt:', {  email, username, password });
    setIsSignUpVisible(false);
  };

  const handleLogin = async (e) => {
    if (isLoggedIn) {
      // Handle logout
      try {
        const response = await fetch(
          "https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/logout",
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setIsLoggedIn(false);
          setUserData(null);
          setIsLoginSuccessful(false);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }

      return;
    }

    // Handle login
    e.preventDefault();
    try {
        const response = await fetch(
          "https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
            credentials: "include",
          }
        );
        if(response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserData(data.user);
          setIsLoginVisible(false);
          setIsLoginSuccessful(true);
          console.log('Login successful'); 
        } else {
          console.log('AUTHENTICATION FAILED')
        }
    } catch (error) {
      console.error('Error:', error);
    }finally {
        setEmail('');
        setPassword('');
      }
    console.log('Login attempt:', { email, password });
  };

  return (
    <div
      className="flex w-full justify-between items-center p-4"
      style={{
        background: "transparent",
      }}
    >
      <div className="flex items-center">
        <Link
          href="/"
          className="text-white text-lg font-bold mr-4 cursor-text" 
          title="Chatbot of your needs"
        >
          Tusk AI
        </Link>

        <button className="text-sm cursor-pointer text-white border border-purple-500 px-6 py-1 rounded hover:bg-purple-900/50 transition-colors">
          New Chat
        </button>
      </div>

      {/* Navigation buttons aligned to the right */}
      <div className="flex space-x-4 justify-end">
        {/* Show different options based on login status */}
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => setIsSignUpVisible(true)}
              className="text-sm cursor-pointer text-white border border-purple-500 px-3 py-1 rounded hover:bg-purple-900/50 transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLoginVisible(true)}
              className="text-sm cursor-pointer text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition-colors"
            >
              Log In
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">
              {userData?.username || "User"}
            </span>
            <button
              onClick={handleLogin}
              className="text-sm cursor-pointer text-white border border-purple-500 px-3 py-1 rounded hover:bg-purple-900/50 transition-colors"
            >
              Log Out
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Full-screen forms */}
        {(isLoginVisible || isSignUpVisible) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900/95 rounded-xl p-8 w-full max-w-md mx-4 border border-purple-900/30 shadow-2xl">
              {isSignUpVisible && (
                <form onSubmit={handleSignUp} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Create Account
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full"
                      placeholder="Name"
                      autoComplete="username"
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full"
                      placeholder="Example@email.com"
                      autoComplete="email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full pr-10"
                      placeholder="Enter your Password"
                      autoComplete="new-password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Password
                    </label>
                    {password && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {showPassword ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full pr-10"
                      placeholder="Confirm your Password"
                      autoComplete="new-password"
                    />
                    <label
                      htmlFor="confirm-password"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Confirm Password
                    </label>
                    {confirmPassword && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-purple-600 text-white rounded-lg px-3 py-2.5 hover:bg-purple-700 transition-all duration-300 w-full font-medium"
                  >
                    Sign Up
                  </button>
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignUpVisible(false)}
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpVisible(false);
                        setIsLoginVisible(true);
                      }}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Already have an account? Log In
                    </button>
                  </div>
                </form>
              )}

              {isLoginVisible && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Welcome Back
                  </h2>
                  <div className="relative">
                    <input
                      type="email"
                      id="login-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full"
                      placeholder="Example@email.com"
                      autoComplete="email"
                    />
                    <label
                      htmlFor="login-email"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      id="login-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent border-b border-purple-900/50 rounded-none px-3 py-2 text-white placeholder-transparent peer focus:outline-none focus:border-purple-500 w-full pr-10"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <label
                      htmlFor="login-password"
                      className="absolute left-3 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500"
                    >
                      Password
                    </label>
                    {password && (
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {showLoginPassword ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white rounded-lg px-3 py-2.5 hover:bg-purple-700 transition-all duration-300 w-full font-medium"
                  >
                    Log In
                  </button>
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsLoginVisible(false)}
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginVisible(false);
                        setIsSignUpVisible(true);
                      }}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Don't have an account? Sign Up
                    </button>
                  </div>
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
