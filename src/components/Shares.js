// StockAnalysis.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shares = ({ stockSymbol }) => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (stockSymbol) {
      axios.get(`https://share-api-nine.vercel.app/stock/analyze/${stockSymbol}`)
        .then(response => {
          console.log(response.data)
          setAnalysis(response.data);
        })
        .catch(error => console.error('Error fetching stock analysis:', error));
    }
  }, [stockSymbol]);

  // Filter true patterns from the yearly patterns
  const trueYearlyPatterns = Object.entries(analysis?.yearly?.yearlyPatterns || {})
    .filter(([pattern, isTrue]) => isTrue) // Filter for true patterns
    .map(([pattern]) => pattern);

  // Filter true patterns from the weekly patterns
  const trueWeeklyPatterns = Object.entries(analysis?.weekly?.weeklyPatterns || {})
    .filter(([pattern, isTrue]) => isTrue) // Filter for true patterns
    .map(([pattern]) => pattern);

  // Filter true patterns from the daily patterns
  const trueDailyPatterns = Object.entries(analysis?.daily?.dailyPatterns || {})
    .filter(([pattern, isTrue]) => isTrue) // Filter for true patterns
    .map(([pattern]) => pattern);

  if (!analysis) return (<div className="flex items-center justify-center h-screen m-5">
    <div className="bg-blue-800 text-white p-4 rounded-lg lg:text-xl text-base font-semibold">
      Welcome in Stock Analyzed Platform
    </div>
  </div>
  );

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-10'>
      <div className='p-5 bg-white shadow-lg rounded-lg max-w-4xl my-6'>
        <h2 className="lg:text-2xl text-xl font-bold text-center mb-4">
          {stockSymbol} Daily Analysis</h2>
        <div className="space-y-3">
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Current Price <span className="font-semibold bg-green-100 text-green-800 px-5 rounded-xl border border-green-800 ml-2">₹{analysis.daily.currentPrice.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Best Buy Level <span className="font-semibold bg-blue-100 text-blue-800 px-5 rounded-xl border border-blue-800 ml-2">₹{analysis.daily.bestBuyLevel.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Support Level <span className="font-semibold bg-yellow-100 text-yellow-800 px-5 rounded-xl border border-yellow-800 ml-2">₹{analysis.daily.support.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Resistance Level <span className="font-semibold bg-pink-100 text-pink-800 px-5 rounded-xl border border-pink-800 ml-2">₹{analysis.daily.resistance.toFixed(2)}</span></p>
          <div className="pl-4 space-y-1">
            {analysis.daily.relevantResistanceLevels.map((d, i) => (
              <p key={i} className="text-blue-600 font-semibold">Level {i + 1}: ₹{d.level.toFixed(2)}</p>
            ))}
          </div>
          {analysis.daily.relevantResistanceLevels.length > 0 && (
            <p className="text-gray-700 lg:text-xl text-base font-medium">
              ReachDays: {analysis.daily.relevantResistanceLevels.map((d, i) => {
                if (d.days <= 6) return `${d.days} Days`;
                return Math.ceil(d.days / 30) === 12 ? `1 Year` : `${Math.ceil(d.days / 30)} Month`;
              }).join(', ')}
            </p>
          )}
        <div className='flex gap-3'>
        <p className={`font-bold ${analysis.daily.isGoodBuy ? 'text-green-600 border-green-800 bg-green-100' : 'text-red-600 border-red-800 bg-red-100'} font-semibold  lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.daily.isGoodBuy ? 'Good Buy' : 'Not Good Buy'}
          </p>
          <p className={`font-bold 
    ${analysis.daily.isGoodBuyRSI === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.daily.isGoodBuyRSI === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.daily.isGoodBuyRSI === true ? 'Good RSI' :
              analysis.daily.isGoodBuyRSI === false ? 'Bad RSI' :
                'Neutral RSI'}
          </p>
          <p className={`font-bold 
    ${analysis.daily.isGoodMAC === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.daily.isGoodMAC === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.daily.isGoodMAC === true ? 'Good MAC' :
              analysis.daily.isGoodMAC === false ? 'Bad MAC' :
                'Neutral MAC'}
          </p>
        </div>

        </div>

        {trueDailyPatterns.length > 0 && <div className="flex flex-wrap gap-3 my-3"> {/* Container with flex and gap for spacing */}
          <span className="bg-slate-500 text-white lg:px-3 px-2 text-base py-1 rounded-3xl font-semibold">Daily Patterns</span> {trueDailyPatterns.map((pattern, index) => (
            <button
              key={index}
              className="bg-blue-600 text-white lg:px-3 px-2 text-base py-1 rounded-3xl" // Add your Tailwind CSS styles here
            >
              {pattern
                .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                .trim() // Remove any leading/trailing spaces
                .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
              }
            </button>
          ))}
        </div> }

        <h2 className='pt-5 text-2xl font-bold text-center mb-4'>{stockSymbol} Weekly Analysis</h2>
        <div className="space-y-3">
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Current Price <span className="font-semibold bg-green-100 text-green-800 px-5 rounded-xl border border-green-800 ml-2">₹{analysis.weekly.currentPrice.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Best Buy Level <span className="font-semibold bg-blue-100 text-blue-800 px-5 rounded-xl border border-blue-800 ml-2">₹{analysis.weekly.bestBuyLevel.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Support Level <span className="font-semibold bg-yellow-100 text-yellow-800 px-5 rounded-xl border border-yellow-800 ml-2">₹{analysis.weekly.support.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Resistance Level <span className="font-semibold bg-pink-100 text-pink-800 px-5 rounded-xl border border-pink-800 ml-2">₹{analysis.weekly.resistance.toFixed(2)}</span></p>
          <div className="pl-4 space-y-1">
            {analysis.weekly.relevantResistanceLevels.map((d, i) => (
              <p key={i} className="text-blue-600 font-semibold">Level {i + 1}: {d.level.toFixed(2)}</p>
            ))}
          </div>
          {analysis.weekly.relevantResistanceLevels.length > 0 && (<p className="text-gray-700 lg:text-xl text-base font-medium">
            ReachDays: {analysis.weekly.relevantResistanceLevels.map((d) => {
              if (d.days <= 6) {
                return `${d.days} Days`;
              } else if (Math.ceil(d.days / 30) === 12) {
                return `1 Year`;
              } else {
                return `${Math.ceil(d.days / 30)} Month`;
              }
            }).join(', ')}
          </p>)}
         <div className='flex gap-3'>
         <p className={`font-bold ${analysis.weekly.isGoodBuy ? 'text-green-600 border-green-800 bg-green-100' : 'text-red-600 border-red-800 bg-red-100'} font-semibold  lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.weekly.isGoodBuy ? 'Good Buy' : 'Not a Good Buy'}
          </p>
          <p className={`font-bold 
    ${analysis.weekly.isGoodBuyRSI === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.weekly.isGoodBuyRSI === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.weekly.isGoodBuyRSI === true ? 'Good RSI' :
              analysis.weekly.isGoodBuyRSI === false ? 'Bad RSI' :
                'Neutral RSI'}
          </p>
          <p className={`font-bold 
    ${analysis.weekly.isGoodMAC === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.weekly.isGoodMAC === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.weekly.isGoodMAC === true ? 'Good MAC' :
              analysis.weekly.isGoodMAC === false ? 'Bad MAC' :
                'Neutral MAC'}
          </p>
         </div>
        </div>
        {trueWeeklyPatterns.length > 0 && <div className="flex flex-wrap gap-3 my-3"> {/* Container with flex and gap for spacing */}
          <span className="bg-slate-500 text-white lg:px-3 px-2 text-base py-1 rounded-3xl font-semibold">Weekly Patterns</span> {trueWeeklyPatterns.map((pattern, index) => (
            <button
              key={index}
              className="bg-blue-600 text-white lg:px-3 px-2 text-base py-1 rounded-3xl" // Add your Tailwind CSS styles here
            >
              {pattern
                .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                .trim() // Remove any leading/trailing spaces
                .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
              }
            </button>
          ))}
        </div> }

        <h2 className='pt-5 text-2xl font-bold text-center mb-4'>{stockSymbol} Yearly Analysis</h2>
        <div className="space-y-3">
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Current Price <span className="font-semibold bg-green-100 text-green-800 px-5 rounded-xl border border-green-800 ml-2">₹{analysis.yearly.currentPrice.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Best Buy Level <span className="font-semibold bg-blue-100 text-blue-800 px-5 rounded-xl border border-blue-800 ml-2">₹{analysis.daily.bestBuyLevel.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Support Level <span className="font-semibold bg-yellow-100 text-yellow-800 px-5 rounded-xl border border-yellow-800 ml-2">₹{analysis.yearly.support.toFixed(2)}</span></p>
          <p className="text-gray-700 lg:text-xl text-lg font-medium">Resistance Level <span className="font-semibold bg-pink-100 text-pink-800 px-5 rounded-xl border border-pink-800 ml-2">{analysis.yearly.resistance.toFixed(2)}</span></p>
          <div className="pl-4 space-y-1">
            <p>
              {analysis.yearly.relevantResistanceLevels.map((d, i) => (
                <p key={i} className="text-blue-600 font-semibold">Level {i + 1}: {d.level.toFixed(2)}</p>
              ))}
            </p>
          </div>
          {analysis.yearly.relevantResistanceLevels.length > 0 && (
            <p className="text-gray-700 lg:text-xl text-base font-medium">
              ReachDays: {analysis.yearly.relevantResistanceLevels.map((d) => {
                if (d.days <= 6) {
                  return `${d.days} Days`;
                } else if (Math.ceil(d.days / 30) === 12) {
                  return `1 Year`;
                } else {
                  return `${Math.ceil(d.days / 30)} Month`;
                }
              }).join(', ')}
            </p>
          )}

         <div className='flex gap-3'>
         <p className={`font-bold ${analysis.yearly.isGoodBuy ? 'text-green-600 border-green-800 bg-green-100' : 'text-red-600 border-red-800 bg-red-100'} font-semibold  lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.yearly.isGoodBuy ? 'Good Buy' : 'Not a Good Buy'}
          </p>
          <p className={`font-bold 
    ${analysis.yearly.isGoodBuyRSI === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.yearly.isGoodBuyRSI === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.yearly.isGoodBuyRSI === true ? 'Good RSI' :
              analysis.yearly.isGoodBuyRSI === false ? 'Bad RSI' :
                'Neutral RSI'}
          </p>
          <p className={`font-bold 
    ${analysis.yearly.isGoodMAC === true ? 'text-green-600 border-green-800 bg-green-100' :
              analysis.yearly.isGoodMAC === false ? 'text-red-600 border-red-800 bg-red-100' :
                'text-gray-600 border-gray-800 bg-gray-100'} 
    font-semibold lg:px-5 px-2 rounded-xl border-2 text-center lg:text-lg text-base whitespace-nowrap`}>
            {analysis.yearly.isGoodMAC === true ? 'Good MAC' :
              analysis.yearly.isGoodMAC === false ? 'Bad MAC' :
                'Neutral MAC'}
          </p>
         </div>
        </div>
        {trueYearlyPatterns.length > 0 &&  <div className="flex flex-wrap gap-3 my-3"> {/* Container with flex and gap for spacing */}
          <span className="bg-slate-500 text-white lg:px-3 px-2 text-base py-1 rounded-3xl font-semibold">Yearly Patterns</span> {trueYearlyPatterns.map((pattern, index) => (
            <button
              key={index}
              className="bg-blue-600 text-white lg:px-3 px-2 text-base py-1 rounded-3xl" // Add your Tailwind CSS styles here
            >
              {pattern
                .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                .trim() // Remove any leading/trailing spaces
                .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
              }
            </button>
          ))}
        </div> }
      </div>
    </div>
  );
};

export default Shares;
