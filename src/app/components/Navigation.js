import Link from 'next/link';
import { useState } from 'react';

function Navigation() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);


  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Sign Up attempt:', { email, username, password });
    setIsSignUpVisible(false);
  };

    const handleLogin = async (e) => {
    e.preventDefault();
    // In a real application, you would send these credentials to your backend for verification
    console.log('Login attempt:', { username, password });
  };

  return (<div className="flex justify-between items-center p-4">
    <div className="flex items-center">
      <Link href="/" className="text-white text-lg font-bold mr-4">Tusk AI</Link>
      <button className="text-sm text-white border border-white px-6 py-1 rounded hover:bg-white hover:text-black transition-colors">New Chat</button>
    </div>

    {/* Navigation buttons aligned to the right */}
    <div className="flex space-x-4 justify-end">
      {/* Conditionally render buttons based on form visibility */}
      {!isLoginVisible && !isSignUpVisible && (<>
        <button onClick={() => setIsSignUpVisible(true)}
                className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-violet hover:text-black transition-colors">
          Sign Up
        </button>
        <button onClick={() => setIsLoginVisible(true)}
                className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition-colors">
          Log In
        </button>
      </>)}

      {/* Full-screen forms */}
      {(isLoginVisible || isSignUpVisible) && (<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-black rounded-lg p-8 max-w-md w-full">
          {isSignUpVisible && (<form onSubmit={handleSignUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
            <div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="bg-black border border-white/20 rounded-md px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:border-white w-full"/>
            </div>
            <div>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                     className="bg-black border border-white/20 rounded-md px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:border-white w-full"/>
            </div>
            <div>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                     className="bg-black border border-white/20 rounded-md px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:border-white w-full"/>
            </div>
            <button type="submit"
                    className="bg-white text-black rounded-md px-3 py-1 hover:bg-neutral-200 transition-colors w-full">
              Sign Up
            </button>
            <button onClick={() => setIsSignUpVisible(false)}
                    className="text-sm text-white hover:text-neutral-200 transition-colors">
              Cancel
            </button>
          </form>)}

          {isLoginVisible && (<form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
            <div>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}                   className="bg-black border border-white/20 rounded-md px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:border-white w-full"/>
            </div>
            <div>

              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                     className="bg-black border border-white/20 rounded-md px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:border-white w-full"/>
            </div>
            <button type="submit"
                    className="bg-white text-black rounded-md px-3 py-1 hover:bg-neutral-200 transition-colors w-full">
              Log In
            </button>
            <button onClick={() => setIsLoginVisible(false)}
                    className="text-sm text-white hover:text-neutral-200 transition-colors">
              Cancel
            </button>
          </form>)}
        </div>
      </div>)}
    </div>
  </div>);
}

export default Navigation;