import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../assets/modal";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
      console.error("Registration error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setFormData({ first_name: "", last_name: "", username: "", password: "" });
    setError("");
  };
  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  if (LoggedIn) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    return (
      <div>
        <h2>Register</h2>
        <p style={{ color: "green" }}>
          You are already logged in as {user.first_name} {user.last_name}. To
          register another account, please logout.
        </p>
        <button onClick={handleLogoutClick}>Logout</button>

        <Modal
          isOpen={modalOpen}
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
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <p>
        If you are an inventory manager, please proceed with account
        registration.
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <button type="submit">Register</button>
      </form>
      <p>Not an inventory manager?</p>
      <Link to={"/inventory"}>
        <button>Continue as Visitor</button>
      </Link>
    </div>
  );
}

export default Register;
