import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
      <p>
        <strong>Quantity:</strong> {item.quantity}
      </p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate("/inventory")}>
          Back to Inventory
        </button>
        {user && (
          <button
            onClick={() => navigate(`/items/${id}/edit`)}
            style={{ marginLeft: "1rem" }}
          >
            Edit Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
