import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const parsedUser = userData ? JSON.parse(userData) : null;
    setUser(parsedUser);

    async function fetchItems() {
      try {
        const url = parsedUser
          ? `/api/items?user_id=${parsedUser.id}`
          : `/api/items`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to load items.");
        } else {
          const data = await response.json();
          setItems(data);
        }
      } catch (err) {
        setError("Error fetching items.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  const welcomeMessage = user
    ? `Welcome ${user.first_name}! View your inventory items below:`
    : "Welcome visitor! View our entire inventory below:";

  return (
    <div>
      <h2>Inventory</h2>
      <h3 style={{ color: "green" }}>{welcomeMessage}</h3>
      <button>Add New Item</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.item_name}</strong> <br />
              {item.description} <br />
              Quantity: {item.quantity} <br />
              <Link to={`/items/${item.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link to="/items/new">
        <button onClick={handleLogout}>Sign out</button>
      </Link>
    </div>
  );
}

export default Inventory;
