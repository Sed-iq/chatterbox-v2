import { io } from "socket.io-client";
import Savechat from "./saveChat";
import ReactTimeAgo from "react-time-ago";
import EmptyChatIco from "./../public/images/empty-chats.svg";
import React, { useEffect, useRef, useState } from "react";
import Loading from "./loading";
import { useParams, useNavigate } from "react-router-dom";
function Body({ chats, setChat, socket, isLog }) {
  const { link } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [online, setOnline] = useState(false);
  const [show, setAuth] = useState(false);
  const toast = useRef();
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
            console.log(on);
            if (on == true) {
              setOnline(true);
              socket.current.on("online", (x) => {
                setAuth(true);
                setOnline(x);
              });
            } else {
              socket.current.on("online", (x) => {
                setOnline(x);
              });
            }
            setAuth(true);
          } else navigate("/chaterror");
        });
      }
    });
  }, [socket, navigate, link]);

  //   Getting messages
  useEffect(() => {
    socket.current.on("broadcast", (data) => {
      if (data.senders_token !== null) setChat((prev) => [...prev, data]);
      else navigate("/error");
    });
  }, [socket, setChat, navigate]);

  return show == false ? (
    <Loading text={"Please wait..."} icon={"pi-spin pi-spinner"} />
  ) : (
    <div>
      <ChatBody
        link={link}
        online={online}
        chats={chats}
        navigate={navigate}
        login={isLog}
        message={message}
        setMessage={setMessage}
        socket={socket}
        setChat={setChat}
        toast={toast}
        ReactTimeAgo={ReactTimeAgo}
        emptyIco={EmptyChatIco}
      />
    </div>
  );
}

function ChatBody({
  link,
  online,
  login,
  navigate,
  chats,
  message,
  setMessage,
  socket,
  ReactTimeAgo,
  setChat,
  emptyIco,
}) {
  const msgRef = useRef();
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scroll({
        top: msgRef.current.scrollHeight,
        left: 0,
        behaviour: "smooth",
      });
    }
  }, [chats]);
  return (
    <>
      <h2 id="ch-icon" className="sm:absolute right-2 top-2 neon">
        Chatterbox v2
      </h2>
      <div
        id="chat_space"
        className=" sm:flex sm:h-screen sm:justify-center sm:items-center"
      >
        <div
          id="chat_container"
          className=" sm:p-3 sm:rounded sm:w-96 text-white"
        >
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
          <div id="chats" ref={msgRef}>
            {chats == "" ? (
              <NomsgRender ico={emptyIco} />
            ) : (
              <MsgRender ReactTimeAgo={ReactTimeAgo} chats={chats} />
            )}

            {/* Chats */}
          </div>
          <div id="message_sender">
            <textarea
              value={message}
              placeholder="Write a message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div
              id="sender"
              onClick={() =>
                SendMessage(
                  socket,
                  setMessage,
                  message,
                  setChat,
                  navigate,
                  link
                )
              }
              className=""
            >
              <i className="pi pi-send text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function MsgRender({ chats, ReactTimeAgo }) {
  return <>{parser(chats, ReactTimeAgo)}</>;
}
function NomsgRender({ ico }) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div>
        <img alt="" srcset={ico} />
      </div>
      <p className=" my-3">No chats...</p>
    </div>
  );
}
function SendMessage(socket, setMessage, message, setChat, navigate, link) {
  if (message.trim().length === 0) {
  } else
    socket.current.emit(
      "message",
      {
        senders_token: localStorage.getItem("senders_token"),
        message: message.trim(),
        $token: localStorage.getItem("token"),
      },
      (data) => {
        setChat((prev) => [...prev, data]);
        // Saving chats
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
function parser(arr, ReactTimeAgo) {
  if (arr == "") return;
  else {
    return arr.map((item, index) => {
      return item.senders_token == localStorage.getItem("senders_token") ? (
        <div id="chat_holder" key={index}>
          <div id="me">
            <p id="time" className="pb-2 text-xs ">
              <ReactTimeAgo date={item.date} locale="en-US" />
            </p>
            <p className="text-sm">{item.message}</p>
          </div>
        </div>
      ) : (
        <div key={index} id="chat_holder">
          <div id="other">
            <p id="time" className="pb-2 text-xs ">
              <ReactTimeAgo date={item.date} locale="en-US" />
            </p>
            <p className="text-sm">{item.message}</p>
          </div>
        </div>
      );
    });
  }
}

export default Body;
