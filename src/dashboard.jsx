import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "./components/verify";
import Axios from "axios";
import Sidebar from "./components/options";
import View from "./components/mainoutput";
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
  return data.userData == null ? (
    <div>
      <p>Erorr loading assets</p> {localStorage.clear()}
    </div>
  ) : (
    <>
      <h2 className="neon absolute right-4 top-2"> Chatterbox v2</h2>
      <div id="dashboard" className="h-screen">
        <div id="options-tab" className="">
          <Sidebar />
        </div>
        <div id="options-output" className="">
          <View data={data} />
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
function LinksParser(links, UserData) {
  try {
    if (links == null || links == "") {
      return "You have no valid link";
    } else {
      return (
        <h2>
          {links.map((data, index) => {
            return (
              <p key={index}>
                <button
                  onClick={(e) => {
                    deleteLink(data, UserData);
                  }}
                >
                  {data}
                </button>
              </p>
            );
          })}
        </h2>
      );
    }
  } catch (error) {
    return "You have no valid link";
  }
}
async function Logout({ navigate }) {
  // Dispatches
  await localStorage.removeItem("token");
  navigate("/login");
}
function deleteLink(data_f, Data) {
  const Endpoint = `http://localhost:5000/code`;
  Axios.put(
    Endpoint,
    {
      code: data_f,
    },
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(({ data }) => {
      if (data.auth == true) {
        let newdata = {
          username: Data.userData.username,
          email: Data.userData.email,
          links: Data.userData.links.filter((c) => c != data_f),
        };
        Data.setData(newdata);
      } else data.setError(data.message);
    })
    .catch((err) => Data.setError("Error Deleting link"));
}
function deleteACC({ setError, navigate }) {
  const Endpoint = "http://localhost:5000/delete";
  Axios.delete(Endpoint, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then(({ data }) => {
      if (data.auth == true) {
        localStorage.removeItem("token");
        navigate("/");
      } else setError(data.message);
    })
    .catch((err) => setError("Error has occurred"));
}
export default Main;
