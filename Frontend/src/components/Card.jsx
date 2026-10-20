import React from 'react';

export default function Card({ url, caption }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-lg">
      <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-950">
        <img
          src={url}
          alt={caption || 'Post image'}
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <p className="mt-2.5 text-sm font-medium text-zinc-200 line-clamp-2 px-1">
          {caption}
        </p>
      )}
    </div>
  );
}
