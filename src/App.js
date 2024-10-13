import logo from './logo.svg';
import './App.css';
import Shares from './components/Shares';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import symbols from '../src/components/NSEList';
import axios from 'axios';


function App() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockAnalysis, setStockAnalysis] = useState({}); // Store analysis data

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchStockAnalysis = async () => {
    if (symbols && symbols.length > 0) {
      for (const stockSymbol of symbols) {
        try {
          const response = await axios.get(`https://share-api-nine.vercel.app/stock/analyze/${stockSymbol}`);
          console.log(response.data.daily.isGoodBuy);
          setStockAnalysis(prevState => ({
            ...prevState,
            [stockSymbol]: response.data.weekly.isGoodBuy, // Store isGoodBuy value for each stock symbol
          }));
        } catch (error) {
          console.error(`Error fetching stock analysis for ${stockSymbol}:`, error);
        }

        // Introduce a delay of 1 second (1000 ms) between requests
        await delay(1000);
      }
    }
  };

  useEffect(() => {
    fetchStockAnalysis(); // Fetch stock analysis data
  }, []);

  return (
    <div>
      <Navbar setStockSymbol={setStockSymbol} stockAnalysis={stockAnalysis}/>
      <Shares stockSymbol={stockSymbol}/>
    </div>
  );
}

export default App;
