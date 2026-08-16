function CoinRow({ coin }) {
  return (
    <tr>
      <td>{coin.market_cap_rank}</td>

      <td className="coin-name">
        <img src={coin.image} alt={coin.name} />
        <span>{coin.name}</span>
      </td>

      <td>{coin.symbol.toUpperCase()}</td>

      <td>${coin.current_price.toLocaleString()}</td>

      <td>${coin.market_cap.toLocaleString()}</td>

      <td
        className={
          coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
        }
      >
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </td>
    </tr>
  );
}

export default CoinRow;
