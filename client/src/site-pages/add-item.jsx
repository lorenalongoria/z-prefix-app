import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    quantity: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // redirect visitors
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: user.id }),
      });

      if (response.ok) {
        navigate("/inventory");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create item.");
      }
    } catch (err) {
      setError("Error creating item.");
      console.error("Create error:", err);
    }
  };

  return (
    <div className="item-details-container">
      <h2>Create New Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Item Name:</label>
        <input
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Save Item</button>
        <button onClick={() => navigate("/inventory")} type="button" style={{ marginLeft: "1rem" }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddItem;
