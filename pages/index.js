// pages/index.js

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domains, setDomains] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch("/api/gpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDescription }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-6 text-center">DOMINATOR</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="businessDescription" className="block text-xl font-semibold mb-2">Describe your business:</label>
            <textarea
              id="businessDescription"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="resize-none w-full h-32 p-2 mb-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-light-blue-500 text-white font-semibold rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Redo
            </button>
          </form>
          <table className="w-full mt-8">
            <thead>
              <tr className="text-xl font-semibold text-cyan-700">
                <th>Domain</th>
                <th>.com</th>
                <th>.net</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain, index) => (
                <tr key={index} className="text-lg text-gray-700 border-t border-gray-200">
                  <td className="py-2">{domain.name}</td>
                  <td className="text-center">{domain.comStatus}</td>
                  <td className="text-center">{domain.netStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
