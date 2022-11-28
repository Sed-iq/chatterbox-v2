import { io } from "socket.io-client";
import Savechat from "./saveChat";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Body({ chats, setChat, socket }) {
  const { link } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [show, setAuth] = useState(false);
  // Socket handlings
  useEffect(() => {
    try {
      socket.current = io("ws://localhost:5000", {
        auth: {
          $token: localStorage.getItem("senders_token"),
        },
      });
    } catch (err) {
      console.log("Error");
    }
    const disc = () => socket.current.close();
    return () => disc();
  }, [socket]);
  //   Joining
  useEffect(() => {
    socket.current.on("thru", (d) => {
      if (d) setAuth(true);
    });
  }, [socket]);
  useEffect(() => {
    socket.current.emit("join", link, (m) => {
      if (m == false) navigate("/error");
    });
  }, [socket, link, navigate]);
  //   Getting messages
  useEffect(() => {
    socket.current.on("broadcast", (data) => {
      if (data.senders_token !== null)
        setChat((prev) => [
          ...prev,
          {
            senders_token: data.senders_token,
            message: data.message,
            date: new Date(),
          },
        ]);
      else navigate("/error");
    });
  }, [socket, setChat, navigate]);

  return show == false ? (
    <h2> Please Wait... </h2>
  ) : (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        onClick={() =>
          SendMessage(socket, setMessage, message, setChat, navigate, link)
        }
      >
        Send Message
      </button>
      {parser(chats)}
    </div>
  );
}
function SendMessage(socket, setMessage, message, setChat, navigate, link) {
  socket.current.emit(
    "message",
    {
      senders_token: localStorage.getItem("senders_token"),
      message,
      $token: localStorage.getItem("token"),
    },
    (data) => {
      setChat((prev) => [
        ...prev,
        {
          senders_token: data.senders_token,
          message: data.message,
          date: new Date(),
        },
      ]);
      //   Saving chats
      Savechat(
        {
          senders_token: data.senders_token,
          message: data.message,
          date: new Date(),
        },
        navigate,
        link
      );
      setMessage("");
    }
  );
}
function parser(arr) {
  if (arr == "") return;
  else {
    return arr.map((item, index) => {
      return item.senders_token == localStorage.getItem("senders_token") ? (
        <p key={index} id="me">
          {item.message}
        </p>
      ) : (
        <p key={index} id="other">
          {item.message}{" "}
        </p>
      );
      //  item.senders_token == localStorage.getItem("senders_token") ? (
      //   <p key={index} id="me">
      //     {item.message}
      //   </p>
      // ) : (
      //   <p key={index} id="other">
      //     {item.message}{" "}
      //   </p>
      // );
    });
  }
}

export default Body;
