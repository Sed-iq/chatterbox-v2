import { io } from "socket.io-client";
import ReactTimeAgo from "react-time-ago";
import EmptyChatIco from "../img/empty-chats.svg";
import React, { useEffect, useRef, useState } from "react";
import Loading from "./loading";
import { useParams, useNavigate } from "react-router-dom";
import { sendMessage } from "../utils/chat_helpers";
import { IO_ENDPOINT } from "../utils/config"

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
      socket.current = io(IO_ENDPOINT, {
        transports: ["websocket", "polling", "flashsocket"],
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
            className="border-b-2 sticky top-0 backdrop-blur-md border-gray-400/20 flex px-4 py-2 flex-row justify-between"
          >
            <div className="flex items-center gap-x-3">
              <button className="hover:bg-gray-400/20 h-9 w-9 rounded-full">
                <i className="pi pi-arrow-left"></i>
              </button>
              <span>
                {online == true ? (
                  <i className="pi pi-circle-fill text-lime-500 text-4xl"></i>
                ) : (
                  <i className="pi pi-circle-fill text-4xl"></i>
                )}
              </span>
              <div className="flex flex-col justify-between ">
                <p className="text-sm font-bold">{link}</p>
                {online == true ? (
                  <p className=" text-xs font-bold text-lime-500">Online</p>
                ) : (
                  <p className="text-xs font-bold text-gray-400">Offline</p>
                )}
              </div>
            </div>
            <div>
              {login == true ? (
                <i
                  onClick={() => navigate("/dashboard")}
                  className=" text-base bg-gray-400/20 h-10 w-10 rounded-full grid place-items-center transition-all ease-in-out cursor-pointer pi pi-user"
                ></i>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div ref={msgRef}>
            {chats == "" ? (
              <NomsgRender ico={emptyIco} />
            ) : (
              <MsgRender ReactTimeAgo={ReactTimeAgo} chats={chats} />
            )}

            {/* Chats */}
          </div>
          <div className="backdrop-blur-md shadow-md rounded-t-md sticky inset-x-0 bottom-0">
            <div className="flex w-full px-4 py-3">
              <form

                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(
                    socket,
                    setMessage,
                    message,
                    setChat,
                    navigate,
                    link
                  )
                }}>
                <input
                  className="bg-transparent h-10 border-2 rounded-l border-blue-400 text-gray-200 placeholder:text-xm placeholder:text-blue-400 w-full p-2 px-4 text-gray-200 text-sm focus:outline-none bg-transparent"
                  value={message}
                  placeholder="Write a message"
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </form>
              <button
                className="flex bg-blue-400 border border-blue-400  h-10 flex-shrink-0 w-14 items-center justify-center rounded-r"
                onClick={() =>
                  sendMessage(
                    socket,
                    setMessage,
                    message,
                    setChat,
                    navigate,
                    link
                  )
                }
              >
                <i className="pi pi-send mt-1 mr-0.5 text-base"></i>
              </button>
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

function parser(arr, ReactTimeAgo) {
  if (arr == "") return;
  else {
    return arr.map((item, index) => {
      return item.senders_token == localStorage.getItem("senders_token") ? (
        <div className="flex w-full personal-chat" key={index}>
          <div className="flex ml-auto max-w-[70%] mr-3 flex-col bg-blue-400/50 px-3 py-1 my-[1px] rounded-l-md">
            <p id="time" className="pb-0.5 font-semibold text-xs ">
              <ReactTimeAgo date={item.date} locale="en-US" />
            </p>
            <p className="text-sm">{item.message}</p>
          </div>
        </div>
      ) : (
        <p key={index} className="others-chat w-full flex">
          <div className="flex mr-auto max-w-[70%] ml-3 flex flex-col bg-gray-600/50 px-3 py-1 my-[1px] rounded">
            <p id="time" className="pb-0.5 text-xs font-semibold">
              <ReactTimeAgo date={item.date} locale="en-US" />
            </p>
            <p className="text-sm">{item.message}</p>
          </div>
        </p>
      );
    });
  }
}

export default Body;
