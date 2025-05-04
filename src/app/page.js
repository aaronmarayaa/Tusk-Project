"use client";
import { useState } from 'react';
import Navigation from './register/page';
import MainContent from './homepage/page';import isValidEmail from './utils';
console.log(isValidEmail("example@gmail.com"))
export default function Home() {
  const [question, setQuestion] = useState('');
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation />
        <MainContent />
    </div>
  );
}
console.log(isValidEmail("example@gmail.com"))

