import { io } from "socket.io-client";
import Savechat from "./saveChat";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Body({ chats, setChat, socket, isLog }) {
  const { link } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [online, setOnline] = useState(false);
  const [show, setAuth] = useState(false);
  // Socket handlings
  useEffect(() => {
    try {
      socket.current = io("ws://localhost:5000", {
        auth: {
          $token: localStorage.getItem("senders_token"),
          $link: link,
        },
      });
    } catch (err) {
      console.log("Error");
    }
    const disc = () => socket.current.close();
    return () => disc();
  }, [socket, link]);
  //   Joining
  useEffect(() => {
    socket.current.on("thru", (d) => {
      if (d) {
        socket.current.emit("join", link, (m, on) => {
          if (m) {
            if (on == true) setOnline(true);
            setAuth(true);
            socket.current.on("online", (x) => {
              setOnline(x);
            });
          } else navigate("/chaterror");
        });
      }
    });
  }, [socket, navigate, link]);

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
      <ChatBody
        link={link}
        online={online}
        chats={chats}
        navigate={navigate}
        login={isLog}
      />
      {/*{parser(chats)}*/}
    </div>
  );
}

function ChatBody({ link, online, login, navigate, chats }) {
  return (
    <>
      <h2 className="sm:absolute right-2 top-2 neon">Chatterbox v2</h2>
      <div
        id="chat_space"
        className=" sm:flex h-screen sm:justify-center  sm:items-center"
      >
        <div id="chat_container" className=" p-3 rounded sm:w-96 text-white">
          <div
            id="header"
            className=" sm:py-1 border-b-2 sm:flex sm:flex-row justify-between"
          >
            <div className="flex">
              <span className=" mx-3 py-2">
                {online == true ? (
                  <i className="pi pi-circle-fill text-lime-500 text-2xl"></i>
                ) : (
                  <i className="pi pi-circle-fill text-2xl"></i>
                )}
              </span>
              <div className=" flex flex-col justify-between ">
                <p className=" px-1 font-bold">{link}</p>
                {online == true ? (
                  <p className=" px-1 text-sm text-lime-500 neon">Online</p>
                ) : (
                  <p className=" px-1 text-sm text-gray-400 neon">Offline</p>
                )}
              </div>
            </div>
            <div>
              {login == true ? (
                <i
                  onClick={() => navigate("/dashboard")}
                  className=" text-xl hover:bg-gray-900 transition-all ease-in-out p-2 rounded cursor-pointer pi pi-user"
                ></i>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div id="chats">
            {parser(chats)} {/* Chats */}
          </div>
          <div id="message_sender"></div>
        </div>
      </div>
    </>
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
