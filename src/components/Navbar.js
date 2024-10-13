import React, { useState, useEffect } from 'react';
import symbols from './NSEList';
import axios from 'axios';

const Navbar = ({ setStockSymbol, stockAnalysis }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  const handleSymbolSelect = (symbol) => {
    setIsDropdownOpen(false);
    setStockSymbol(symbol); // Call API to fetch stock data for the selected symbol
  };

  return (
    <nav className="bg-blue-900 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white lg:text-2xl text-xl font-bold">Stock Analyzer</h1>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none transition duration-200"
        >
          Select Stock
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 rounded-lg w-auto left-1/2 transform -translate-x-1/2 h-80 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <ul className="py-2">

              {symbols.map((symbol) => {
                console.log(stockAnalysis)
                const isGoodBuy = stockAnalysis[symbol]; // Get isGoodBuy for the symbol
                return (
                  <li
                    key={symbol}
                    className={`px-4 py-2 cursor-pointer transition duration-150 shadow-lg
                      ${isGoodBuy ? 'shadow-green-700 hover:bg-green-200 shadow-md' : ' hover:bg-gray-200'} `}
                    onClick={() => handleSymbolSelect(symbol)}
                  >
                    {symbol}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
