import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  if (loading) {
    return <p>Loading item details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!item) {
    return <p>No item details available.</p>;
  }

  return (
    <div className="item-details-container">
      <h2>{item.item_name}</h2>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
        <strong>Quantity:</strong> {item.quantity}
        <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate("/inventory")}>Back to Inventory</button>
        {user && (
          <>
            <button
              onClick={() => navigate(`/items/${id}/edit`)}
              style={{ marginLeft: "1rem" }}
            >
              Edit Item
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{ marginLeft: "1rem"}}
            >
              Delete Item
            </button>
          </>
        )}
      </div>
      {showModal && (
        <div>
          <div>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white", marginRight: "1rem" }}>
              Yes, Delete
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default ItemDetails;
