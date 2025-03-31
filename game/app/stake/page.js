"use client";

import { useState } from "react";

export default function Stake() {
  const [distance, setDistance] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Stake Tokens</h2>
        <label className="block mb-2">Distance:</label>
        <input
          type="number"
          className="w-full p-2 border rounded-lg mb-4"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter distance"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          stake
        </button>
      </div>
    </div>
  );
}
