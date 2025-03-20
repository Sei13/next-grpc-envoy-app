'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { getUser } from '@/utils/grpc';
import { User } from '@/proto/user_pb';

export default function Home() {
  const [userId, setUserId] = useState('');
  const { data: user, error, isLoading, mutate } = useSWR<User.AsObject>(
    userId ? `user/${userId}` : null,
    () => getUser(userId)
  );

  const handleGetUser = async () => {
    if (userId) {
      await mutate();
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">gRPC User Service Demo</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleGetUser}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Get User'}
          </button>

          {error && (
            <div className="text-red-600">
              Error: {error.message}
            </div>
          )}

          {user && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold">User Details</h2>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
