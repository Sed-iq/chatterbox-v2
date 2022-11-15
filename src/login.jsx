import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verify from "./components/verify";
function SubmitHandler(data, navigate, setState) {
  data.preventDefault();
  const username = document.forms[0][0].value;
  const password = document.forms[0][1].value;
  const Endpoint = "http://localhost:5000/login";
  axios
    .post(
      Endpoint,
      {
        username,
        password,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => {
      // Saving in the localstorage
      if (data.auth === true) {
        navigate("/dashboard");
        localStorage.setItem("token", data.token);
      } else {
        setState(data.message);
      }
    })
    .catch((err) => {
      console.log("Error");
      setState("Error has occurred");
    });
}
function Main() {
  const [error, setState] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verify(setAuth);
  }, [navigate]);
  if (auth === false)
    return <LoginView state={setState} error={error} navigate={navigate} />;
  else if (auth === null) return;
  else if (auth === true) navigate("/dashboard");
}

function LoginView({ state, error, navigate }) {
  return (
    <div>
      <form onSubmit={(e) => SubmitHandler(e, navigate, state)}>
        <input type="text" placeholder="username" /> <br /> <br />
        <input type="password" placeholder=" ***" /> <br /> <br />
        <button> Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
export default Main;
