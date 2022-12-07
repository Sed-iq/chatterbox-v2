import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verify from "./components/verify";
import Input from "./components/form_disp";
import ico from "./public/images/undraw_loving_story_re_wo5x.svg";
function RegisterView({ navigate }) {
  var illus_text = (
    <h2 className="lg:text-3xl text lg:py-5">
      Register with us and explore a new{" "}
      <span className="p-2 neon bg-indigo-500 rounded">World</span>{" "}
    </h2>
  );
  return (
    <Input
      icon={ico}
      navigate={navigate}
      reg={true}
      illus={""}
      logoHeader={"Register"}
      illus_text={illus_text}
      btn_text={"Register"}
      either_route={"/login"}
      either_text={"Already have an account? Login"}
    />
  );
}

function Main() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    verify(setAuth);
  }, [navigate]);
  if (auth === false) return <RegisterView navigate={navigate} />;
  else if (auth === null) return;
  else if (auth === true) navigate("/dashboard");
}
export default Main;
