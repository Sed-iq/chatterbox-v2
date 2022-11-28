// main chat screen
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useRef } from "react";
import Body from "./components/chatBody";

function starter(link, navigate, setDone, setChat) {
  // Verifies token and assembles chat
  const Endpoint = `http://localhost:5000/anon/${link}`;
  Axios.post(
    Endpoint,
    {},
    {
      headers: {
        "x-token": JSON.stringify({
          senderToken: localStorage.getItem("senders_token"),
          accessToken: localStorage.getItem("token"),
        }),
      },
    }
  )
    .then(({ data }) => {
      if (data.auth !== true) localStorage.setItem("senders_token", data.token);
      const { chats } = data;
      setChat(chats);
      setDone(true);
    })
    .catch((err) => {
      navigate("/error");
    });
}
function Main() {
  const [done, Done] = useState(null);
  const [chats, setChat] = useState([]);
  const isMounted = useRef();
  var socket = useRef();
  const navigate = useNavigate();
  const { link } = useParams();
  useEffect(() => {
    if (!isMounted) return (isMounted.current = true);
    starter(link, navigate, Done, setChat);
  }, [navigate, link]);
  return done === null ? (
    <p>Loading chats...</p>
  ) : (
    <Body chats={chats} setChat={setChat} socket={socket} />
  );
}

export default Main;
