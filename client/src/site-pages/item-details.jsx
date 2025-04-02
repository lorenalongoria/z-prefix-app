import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setEditedItem(item);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Update failed.");
      } else {
        const updatedItem = await response.json();
        setItem(updatedItem);
        setEditing(false);
      }
    } catch (err) {
      setError("Error updating item.");
      console.error("Update error:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/inventory");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete item.");
      }
    } catch (err) {
      setError("Error deleting item.");
      console.error("Delete error:", err);
    }
  };

  if (loading) return <p>Loading item details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>No item details available.</p>;

  return (
    <div className="item-details-container">
      <h2>{editing ? "Edit Item" : item.item_name}</h2>

      {editing ? (
        <div>
          <label>Item Name:</label>
          <input
            name="item_name"
            value={editedItem.item_name}
            onChange={handleChange}
          />
          <br />
          <label>Description:</label>
          <textarea
            name="description"
            value={editedItem.description}
            onChange={handleChange}
          />
          <br />
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => navigate("/inventory")}>
              Back to Inventory
            </button>

            {user && (
              <>
                <button
                  onClick={handleEditClick}
                  style={{ marginLeft: "1rem" }}
                >
                  Edit Item
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete Item
                </button>
              </>
            )}
          </div>

          {showModal && (
            <div style={{ marginTop: "1rem" }}>
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this item?</p>
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "1rem",
                }}
              >
                Yes, Delete
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
