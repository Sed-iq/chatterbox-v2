import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verify from "./components/verify";
import Login_page from "./components/form_disp";
import Login_illus from "./public/images/undraw_enter_uhqk.svg";

function Main() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verify(setAuth);
  }, [navigate]);
  if (auth === false) return <LoginView state={setError} navigate={navigate} />;
  else if (auth === null) return;
  else if (auth === true) navigate("/dashboard");
}

function LoginView({ state, navigate }) {
  var illus_text = (
    <h2 className="lg:text-3xl text lg:py-5">
      Login to your account and explore so{" "}
      <span className="p-2 neon bg-indigo-500 rounded">More</span>{" "}
    </h2>
  );
  return (
    <Login_page
      icon={Login_illus}
      setError={state}
      navigate={navigate}
      logoHeader={"Login"}
      illus_text={illus_text}
      btn_text={"Login"}
      either_route={"/register"}
      either_text={"New? Register here."}
    />
  );
}
export default Main;
