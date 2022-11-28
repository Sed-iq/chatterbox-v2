import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Verify from "./components/verify";
import Axios from "axios";
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
      <p>Erorr loading assets</p> {localStorage.removeItem("token")}
    </div>
  ) : (
    <div>
      <p>{data.error}</p>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          Logout(data);
        }}
      >
        Logout
      </button>{" "}
      <button
        onClick={() => {
          data.navigate("/chats");
        }}
      >
        Chats
      </button>
      <br /> <br />{" "}
      <button
        onClick={() => {
          deleteACC(data);
        }}
      >
        Delete Account
      </button>
      <br /> <br />
      <button
        onClick={() => {
          GenerateLink(data, data.setError);
        }}
      >
        Generate Anonymous Link
      </button>
      <p>
        <b>User data:</b>
      </p>
      <span>
        <b>Name:</b>
        {data.userData.username}
      </span>
      <br />
      <span>
        <b>Email:</b>
        {data.userData.email}
      </span>
      <br />
      <span>
        <b>Anonymous Links:</b>
      </span>
      <br />
      <small>{LinksParser(data.userData.links, data)}</small>
    </div>
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
