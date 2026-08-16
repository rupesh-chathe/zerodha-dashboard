import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const [searchParams] = useSearchParams();

  let user = {};

  try {
    const userData = searchParams.get("user");

    if (userData) {
      user = JSON.parse(decodeURIComponent(userData));
    }
  } catch (error) {
    console.log("User data error:", error);
  }

  const userName =
    user.name ||
    user.username ||
    user.email ||
    "USERID";

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(
      !isProfileDropdownOpen
    );
  };

  const handleLogout = () => {
    window.location.href =
      "http://localhost:3000/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">

      <img
        src="/logo.png"
        style={{ width: "50px" }}
        alt="Logo"
      />

      <div className="menus">

        <ul>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p
                className={
                  selectedMenu === 5
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        <div
          className="profile"
          onClick={handleProfileClick}
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
