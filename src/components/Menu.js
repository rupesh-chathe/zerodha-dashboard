import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  let user = {};

  // First check URL
  try {
    const userData = searchParams.get("user");

    if (userData) {
      user = JSON.parse(decodeURIComponent(userData));

      // Save user on DASHBOARD domain
      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (error) {
    console.log("URL user data error:", error);
  }

  // If URL doesn't have user, check localStorage
  if (!user.name && !user.username && !user.email) {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (error) {
      console.log("LocalStorage user error:", error);
    }
  }

  const userName =
    user.name ||
    user.username ||
    user.email ||
    "USERID";

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
    { name: "Funds", path: "/funds" },
    { name: "Apps", path: "/apps" },
  ];

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href =
      "https://zerodha-landing-019w.onrender.com/login";
  };

  return (
    <div className="menu-container">
      <img
        src="/logo.png"
        style={{ width: "50px" }}
        alt="Logo"
      />

      <div className="menus">
        <ul>
          {menuItems.map((item) => {
            const isSelected =
              location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className={
                      isSelected
                        ? "menu selected"
                        : "menu"
                    }
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <hr />

        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ position: "relative" }}
        >
          <div className="avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <p className="username">
            {userName}
          </p>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "45px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#ff4d4d",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
