import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../components/form_disp";
import login_illustration from "../img/undraw_enter_uhqk.svg";
import { verifyToken } from "../utils/auth_helpers";

function Main() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken(setAuth);
  }, [navigate]);
  if (auth === false) return <LoginView state={setError} navigate={navigate} />;
  else if (auth === null) return;
  else if (auth === true) navigate("/dashboard");
}

function LoginView({ state, navigate }) {
  var illustration_text = (
    <h2 className="lg:text-3xl text lg:py-5">
      Login to your account and explore so{" "}
      <span className="p-2 neon bg-indigo-500 rounded">More</span>{" "}
    </h2>
  );
  return (
    <LoginPage
      icon={login_illustration}
      setError={state}
      navigate={navigate}
      logoHeader={"Login to ChatterBox"}
      illus_text={illustration_text}
      btn_text={"Login"}
      either_route={"/register"}
      either_text={"Not a member? Register here."}
    />
  );
}
export default Main;
