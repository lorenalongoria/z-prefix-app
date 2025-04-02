import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // Parse the stored user (if any) to get an object
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);

    async function fetchItems() {
      try {
        // Use the parsed user object to build the URL
        const url = parsedUser ? `/api/items?user_id=${parsedUser.id}` : `/api/items`;
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
  }, []); // Only run once on mount

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const previewText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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
      <Link to="/items/new">
        <button>Add New Item</button>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.item_name}</strong> <br />
              {previewText(item.description, 100)} <br />
              Quantity: {item.quantity} <br />
              <Link to={`/items/${item.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
      <br />
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
}

export default Inventory;
