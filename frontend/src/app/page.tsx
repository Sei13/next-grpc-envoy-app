'use client';

import { useState } from 'react';
import { grpcClient, UserService, GetUserRequest, GetUserResponse } from '@/utils/grpc';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<GetUserResponse['user'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetUser = async () => {
    try {
      setError(null);
      const request: GetUserRequest = { id: userId };
      const response = await grpcClient.rpcCall<GetUserRequest, GetUserResponse>(
        'user.UserService/GetUser',
        request
      );
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Get User
          </button>

          {error && (
            <div className="text-red-600">
              Error: {error}
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
