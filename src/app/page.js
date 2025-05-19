'use client';

import Navigation from './pages/Navigation';
import { useState } from 'react';
import MainContent from './pages/MainContent';

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  return (
    <main>
      <section>
        <Navigation 
          isLoginVisible={isLoginVisible} 
          setIsLoginVisible={setIsLoginVisible}
          isSignUpVisible={isSignUpVisible} 
          setIsSignUpVisible={setIsSignUpVisible}
          isLoginSuccessful={isLoginSuccessful}
          setIsLoginSuccessful={setIsLoginSuccessful}
          setUser={setUser}
        />
      </section>
      <section>
        <MainContent
          user={user}
          setUser={setUser}
          isLoginSuccessful={isLoginSuccessful}
          setIsLoginSuccessful={setIsLoginSuccessful}
        />
      </section>
    </main>
  );
}

export default App;
