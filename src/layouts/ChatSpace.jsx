// main chat screen
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useRef } from "react";
import Body from "../components/chatBody";
import Loading from "../components/loading";

function starter(link, navigate, setDone, setChat, setLog) {
  // Verifies token and assembles chat
  const Endpoint = `https://chatterbox-v2-api.vercel.app/anon/${link}`;
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
      else if (data.accessToken === localStorage.getItem("token")) setLog(true);
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
  const [_logged, setLog] = useState(false);
  const isMounted = useRef();
  var socket = useRef();
  const navigate = useNavigate();
  const { link } = useParams();
  useEffect(() => {
    if (!isMounted) return (isMounted.current = true);
    starter(link, navigate, Done, setChat, setLog);
  }, [navigate, link]);
  return done === null ? (
    <Loading text={"Loading..."} icon={"pi-spin pi-spinner "} />
  ) : (
    <Body chats={chats} setChat={setChat} socket={socket} isLog={_logged} />
  );
}

export default Main;
