import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Create_post from './pages/Create_post';
import Feeds from './pages/Feeds';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
        <span className="font-bold text-lg">Posts App</span>
        <div className="flex gap-4 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-white">Create Post</Link>
          <Link to="/feeds" className="hover:text-white">Feeds</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Create_post />} />
        <Route path="/feeds" element={<Feeds />} />
      </Routes>
    </div>
  );
}
