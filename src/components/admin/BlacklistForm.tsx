import React, { useState } from 'react';

interface Props {
  onAdd: (entry: { email: string; content: string }) => void;
}

export default function BlacklistForm({ onAdd }: Props) {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ email, content });
    setEmail('');
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <div>
        <label className="block text-md font-semibold text-app-text">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-app-lightbrown rounded-lg h-8 p-4 focus:border-app-text font-medium"
        />
      </div>
      <div>
        <label className="block text-md font-semibold text-app-text">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 block w-full border border-app-lightbrown rounded-lg p-4 font-medium"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-app-text text-white font-bold px-4 py-2 rounded"
      >
        Add to Blacklist
      </button>
    </form>
  );
}
