import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "./components/verify";
import Axios from "axios";
import Sidebar from "./components/options";
import View from "./components/mainoutput";
import ChatList from "./components/chatList";

function GetUserData(setState) {
  const Endpoint = "http://localhost:5000/dashboard";
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
      setState(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function Body({ data }) {
  const [links, setLinks] = useState(data.userData.links);
  const [optView, setView] = useState(
    <ChatList links={links} setLinks={setLinks} />
  );
  return data.userData == null ? (
    <div>
      <p>Erorr loading assets, please reload tab...</p> {localStorage.clear()}
    </div>
  ) : (
    <>
      <h2 className="neon absolute right-4 top-2"> Chatterbox v2</h2>
      <div id="dashboard" className="h-screen">
        <div id="options-tab" className="">
          <Sidebar
            data={data}
            links={links}
            setLinks={setLinks}
            changeView={setView}
          />
        </div>
        <div id="options-output" className="">
          <View data={data} view={optView} changeView={setView} />
        </div>
      </div>
    </>
  );
}

function Main() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userData, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    Verify(setAuth);
    GetUserData(setData);
  }, [navigate]);
  if (auth === false) navigate("/login");
  else if (auth === true && userData !== null)
    return <Body data={{ userData, setData, error, setError, navigate }} />;
  else return <div>Loading...</div>;
}
function GenerateLink({ userData, setData, setError }) {
  const Endpoint = "http://localhost:5000/generate";
  Axios.put(
    Endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(({ data }) => {
      if (data.auth === false && data.message) setError(data.message);
      else if (data.auth === true && !data.message) {
        userData.links.push(data.newCode);
        let newdata = {
          username: userData.username,
          email: userData.email,
          links: userData.links,
        };
        setData(newdata);
      } else setError("Cannot generate link error has occurred");
    })
    .catch((err) => {
      setError("Cannot generate link error has occurred");
    });
}

export default Main;
