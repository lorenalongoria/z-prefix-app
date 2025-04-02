import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>Online Store Database</h1>
      </Link>
    </header>
  );
}

export default Header;
