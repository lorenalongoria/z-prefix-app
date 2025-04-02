import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Inventory Managers:</h2>
      <p>To view or edit items, please login or create an account.</p>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/register"}>
        <button>Register</button>
      </Link>
      <h2>Visitors:</h2>
      <p>To view all items, please select the button below.</p>
      <Link to={"/inventory"}>
        <button>View Inventory</button>
      </Link>
    </div>
  );
}

export default Home;
