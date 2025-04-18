'use client';

import React, { useEffect, useState } from 'react';
import BlacklistForm from '@/components/admin/BlacklistForm';
import BlacklistSearch from '@/components/admin/BlacklistSearch';
import BlacklistTable from '@/components/admin/BlacklistTable';
import { Blacklist } from '@/types/blacklist';
import {
  fetchAllBlacklist,
  addBlacklist,
  searchBlacklist,
  deleteBlacklist,
} from '@/lib/api/admin';

export default function BlacklistPage() {
  const [blacklist, setBlacklist] = useState<Blacklist[]>([]);
  const [searchResult, setSearchResult] = useState<Blacklist[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllBlacklist();
      setBlacklist(data);
    };
    fetchData();
  }, []);

  const handleAdd = async (entry: Blacklist) => {
    await addBlacklist(entry);
    const data = await fetchAllBlacklist();
    setBlacklist(data);
  };

  const handleSearch = async (email: string) => {
    const result = await searchBlacklist(email);
    setSearchResult(result ? [result] : []);
  };

  const handleDelete = async (email: string) => {
    await deleteBlacklist(email);
    const data = await fetchAllBlacklist();
    setBlacklist(data);
  };

  return (
    <div className="flex justify-center min-h-screen py-4 md:py-16 rounded-lg">
      <div className="flex flex-col md:flex md:flex-row md:p-0 p-4 md:w-11/12 rounded-lg shadow-xl md:rounded-none md:shadow-none gap-4 md:gap-16">
        <div className="rounded-lg shadow-xl md:p-8 p-4 md:h-fit md:w-1/3 bg-white">
          <h1 className="text-2xl font-bold">Blacklist Management</h1>
          <BlacklistForm onAdd={handleAdd} />
        </div>

        <div className="md:flex md:flex-col md:p-0 md:h-fit md:w-full">
          <h1 className="text-2xl font-bold mt-4 md:mt-0 mb-6">Search</h1>
          <BlacklistSearch onSearch={handleSearch} />
          <BlacklistTable
            data={searchResult !== null ? searchResult : blacklist}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
