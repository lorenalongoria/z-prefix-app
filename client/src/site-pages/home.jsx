import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Inventory Management System</h1>
      <br></br>
      <Link to={"/register"}>
        <button>Register</button>
      </Link>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/inventory"}>
        <button>View Inventory</button>
      </Link>
    </div>
  );
}

export default Home;