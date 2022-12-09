import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "./components/verify";
import Axios from "axios";
import Sidebar from "./components/options";
import View from "./components/mainoutput";
import ChatList from "./components/chatList";
import Bar from "./components/lowerBar";
import Loading from "./components/loading";
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
      if (data.auth === true) setState(data.data);
      else setState(false);
    })
    .catch((err) => {
      setState(null);
      console.log(err);
    });
}
function Body({ data, navigate }) {
  const [links, setLinks] = useState(data.userData.links);
  const [optView, setView] = useState(
    <ChatList links={links} setLinks={setLinks} />
  );
  return data.userData == false ? (
    <div>
      {navigate("/login")}
      {localStorage.clear()}
    </div>
  ) : (
    <>
      <h2 id="disp" className="neon absolute right-4 top-2">
        {" "}
        Chatterbox v2
      </h2>
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
        <div id="MobileBar">
          <Bar
            data={data}
            links={links}
            setLinks={setLinks}
            changeView={setView}
          />
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
    return (
      <Body
        data={{ userData, setData, error, setError, navigate }}
        navigate={navigate}
      />
    );
  else return <Loading text={"Loading..."} icon={"pi-spin pi-spinner"} />;
}

export default Main;
