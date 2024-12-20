import React from 'react';
import BitcoinHoldings from '../components/BitcoinHoldings';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bitcoin Holdings Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of global Bitcoin distribution
          </p>
        </div>
        <BitcoinHoldings />
      </div>
    </div>
  );
}
