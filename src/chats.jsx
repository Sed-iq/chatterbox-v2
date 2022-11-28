// Lists all chat
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import verify from "./components/verify";
import Axios from "axios";
function Body({ data }) {
  const { links, error } = data;
  return (
    <div>
      <p>{error}</p>
      <h4>Chat links:</h4>
      {parse(links)}
    </div>
  );
}
function getLinks(setLinks, setError) {
  const Endpoint = "http://localhost:5000/showChats";
  Axios.post(
    Endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(({ data }) => {
      if (data.auth === true) {
        setLinks(data.links);
      } else {
        setError(data.message);
      }
    })
    .catch((e) => {
      console.error(e);
      setError("An error has occurred");
    });
}
function Main() {
  const [auth, setAuth] = useState(null);
  const [links, setLinks] = useState(null);
  const [error, setErr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    verify(setAuth);
    getLinks(setLinks, setErr);
  }, [navigate]);
  if (auth === false) navigate("/login");
  else if (auth === null) return;
  else if (auth === true) return <Body data={{ links, error }} />;
}
function parse(arr) {
  return arr == null ? (
    <p>No chats</p>
  ) : (
    arr.map((item, index) => {
      return (
        <h3 key={index}>
          <Link to={`/anon/${item}`}>
            <button>{item}</button>
          </Link>
        </h3>
      );
    })
  );
}
export default Main;
