import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../assets/modal";

function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
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
    setModalOpen(false);
    window.location.reload();
  };
  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const previewText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  const welcomeMessage = user
    ? `Welcome ${user.first_name}! View your inventory items below:`
    : "Welcome visitor! View our entire inventory below:";

  return (
    <div>
      <h2>Current Inventory</h2>
      <h3 style={{ color: "green" }}>{welcomeMessage}</h3>
      {user && <button style={{ marginBottom: "1rem" }}>Add New Item</button>}
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
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <button onClick={handleSignIn}>Login</button>
      )}
      <Modal
        isOpen={ModalOpen}
        title="Confirm Logout"
        onClose={() => setModalOpen(false)}
      >
        <p>Are you sure you want to logout?</p>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "1rem",
            }}
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setModalOpen(false)}
            style={{ marginLeft: "1rem" }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Inventory;
