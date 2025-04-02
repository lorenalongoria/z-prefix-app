import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/items');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load items.');
        }
      } catch (err) {
        setError('Error fetching items.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div>
      <h2>Inventory</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button>Add New Item</button>
      </Link>
    </div>
  );
}

export default Inventory;
