import React, { useState } from 'react';

interface Props {
  onSearch: (email: string) => void;
}

export default function BlacklistSearch({ onSearch }: Props) {
  const [email, setEmail] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(email);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-md font-semibold text-app-text">
          Search by Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full md:w-1/2 border font-medium border-app-lightbrown rounded-lg h-8 p-4"
        />
      </div>
      <button
        type="submit"
        className="bg-app-red text-app-text w-full md:w-1/2 font-bold px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}
