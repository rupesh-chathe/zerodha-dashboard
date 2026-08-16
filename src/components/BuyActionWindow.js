import React, { useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async (e) => {
    e.preventDefault();

    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter valid quantity and price.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://zerodha-backend-hia8.onrender.com/newOrders",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        }
      );

      console.log("BUY ORDER RESPONSE:", response.data);

      alert("Buy order placed successfully!");

      GeneralContext.closeBuyWindow();

      // Refresh page so updated data is visible
      window.location.reload();
    } catch (error) {
      console.log("BUY ORDER ERROR:", error);
      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Unable to place buy order."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    GeneralContext.closeBuyWindow();
  };

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
    >
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin required ₹
          {(Number(stockQuantity) *
            Number(stockPrice)).toFixed(2)}
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Buying..." : "Buy"}
          </button>

          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
