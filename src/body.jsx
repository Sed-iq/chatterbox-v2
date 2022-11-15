import { Link } from "react-router-dom";
function App() {
  return (
    <div>
      <Link to={"/login"}>Login</Link> <br />
      <Link to={"/Register"}>Register</Link> <br />
      <Link to={"/dashboard"}>Dashboard</Link> <br />
    </div>
  );
}

export default App;
