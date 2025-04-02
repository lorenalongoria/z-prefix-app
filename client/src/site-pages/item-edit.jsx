import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    item_name: "",
    description: "",
    quantity: 0,
    user_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to load item details.");
        } else {
          const data = await response.json();
          setItem(data);
        }
      } catch (err) {
        setError("Error fetching item details.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Update failed.");
      } else {
        navigate("/inventory");
      }
    } catch (err) {
      setError("Error updating item.");
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return <p>Loading item details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="edit-item-container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={item.item_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Save Changes</button>
      </form>
      <br />
      <button onClick={() => navigate("/inventory")}>Back to Inventory</button>
    </div>
  );
}

export default EditItem;
