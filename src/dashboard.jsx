import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "./components/verify";

function Body() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
function Main() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    Verify(setAuth);
  }, [navigate]);
  if (auth === false) navigate("/login");
  else if (auth === null) return;
  else if (auth === true) return <Body />;
}
export default Main;
