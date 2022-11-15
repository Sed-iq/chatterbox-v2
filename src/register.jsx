import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verify from "./components/verify";
function RegisterView() {
  return (
    <div>
      <form>
        <input type={"text"} placeholder="Write your username"></input> <br />{" "}
        <br />
        <input type={"password"} placeholder="Write your password"></input>{" "}
        <br /> <br />
        <button>Register</button>
      </form>
    </div>
  );
}
function Main() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    verify(setAuth);
  }, [navigate]);
  if (auth === false) return <RegisterView />;
  else if (auth === null) return;
  else if (auth === true) navigate("/dashboard");
}
export default Main;
