import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/inventory");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUserData({ username: "", password: "" });
    setError("");
  };

  if (LoggedIn) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    return (
      <div>
        <h2>Inventory Manager Login</h2>
        <p style={{ color: "green" }}>
          You are already logged in as {user.first_name} {user.last_name}.
        </p>
        <button onClick={handleLogout}>Logout</button>
        <Link to={"/inventory"}>
          <button>View My Inventory</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Inventory Manager Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <button type="submit">Login</button>
      </form>
      <p>Not an inventory manager?</p>
      <Link to={"/inventory"}>
        <button>Continue as Visitor</button>
      </Link>
    </div>
  );
}

export default Login;
