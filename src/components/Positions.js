import { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get(
          "https://zerodha-backend-hia8.onrender.com/allPositions"
        );

        console.log("POSITIONS RESPONSE:", res.data);

        setAllPositions(
          Array.isArray(res.data) ? res.data : []
        );
      } catch (err) {
        console.log("POSITIONS ERROR:", err);
        setError("Unable to load positions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return <h3 className="title">Loading positions...</h3>;
  }

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, index) => {
              const curValue =
                stock.price * stock.qty;

              const profit =
                curValue -
                stock.avg * stock.qty;

              const isProfit = profit >= 0;

              const profClass = isProfit
                ? "profit"
                : "loss";

              const dayClass = stock.isLoss
                ? "loss"
                : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>

                  <td>{stock.name}</td>

                  <td>{stock.qty}</td>

                  <td>
                    {Number(stock.avg).toFixed(2)}
                  </td>

                  <td>
                    {Number(stock.price).toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {profit.toFixed(2)}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
