import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getPosts } from '../services/postService';

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    async function fetchFeedData() {
        setLoading(true);
        const res = await getPosts(); 
        setPosts(res.data.data); 
        setLoading(false);
      
    }

    fetchFeedData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Feeds</h1>
          <Link
            to="/"
            className="rounded-xl bg-rose-950 border border-rose-900 px-4 py-2 text-sm font-medium text-white hover:bg-rose-900 transition-colors"
          >
            + Create Post
          </Link>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Card key={post._id} url={post.url} caption={post.caption} />
            ))}
          </div>
      </div>
    </div>
  );
}
