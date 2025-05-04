function Navigation() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLoginVisible();
  }, []);
  return(
    <div>
      {isLoginVisible && (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
          <div>
            <input 
              type="text" 
              placeholder="Email" 
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
  );
}