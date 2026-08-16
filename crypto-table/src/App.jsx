import { useEffect, useState } from "react";
import CoinRow from "./components/CoinRow";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

return (
  <div className="app">
    <h1 className="title">Crypto Market</h1>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24h Change</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </tbody>

        {loading && <p className="status">Loading...</p>}

{error && <p className="error">{error}</p>}
      </table>
    </div>
  </div>
);
}

export default App;