import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/postService';

export default function Create_post() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
      await createPost(file, caption);
      navigate('/feeds');
    setLoading(false)
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl border-2 border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg font-bold text-white">Create Post</h1>
          <Link to="/feeds" className="text-sm text-rose-400 hover:underline">
            View Feeds →
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-700 file:px-3 file:py-1 file:text-sm file:text-zinc-200"
          />

          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-xl border border-rose-900/60 bg-rose-950/80 p-3 text-base font-semibold text-zinc-100 hover:bg-rose-900 disabled:opacity-50 transition-colors"
            >
          </button>
        </form>
      </div>
    </div>
  );
}
