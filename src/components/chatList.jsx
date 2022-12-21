import { Toast } from "primereact/toast";
import { useRef } from "react";
import logo from "../img/chatter_box_logo_white.svg";
import { Link, useNavigate } from "react-router-dom";
import { generateChatLink } from "../utils/chat_helpers";

function ChatList({ links }) {
  const navigate = useNavigate();
  const toast = useRef();
  return (
    <div id="cover">
      {/* Header */}
      <div id="chat-list-header" className=" text-base pb-2 px-2 neon">
        Chatterbox v2
      </div>
      <div
        className="neon flex py-2 bg-base-purple flex items-center justify-center backdrop-blur-md z-10 justify-center items-center py-2"
      >
        <img className="h-9 w-9" srcSet={logo} alt="" />
        <p className="mt-1 px-2 text-lg">Chats</p>
      </div>
      <div className="px-3 py-4">
        <p className="text-2xl font-bold">Recent Chats</p>
        <div className="flex flex-row gap-x-2 py-2 overflow-x-auto border-b-4 border-base-purple">
          {links == "" ? (
            <></>
          ) : (
            links.map((item, index) => {
              return (
                <Link
                  to={`/anon/${item}`}
                  key={index}
                  className="flex bg-gray-400/20 hover:bg-gray-400/40 px-2 py-1 rounded-md gap-x-2 items-center"
                >
                  <div className="chat-color-icon pi pi-circle-fill text-4xl w-full text-center"></div>
                  <p className="text-base font-bold ">{item}</p>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div className="px-3">
        <p className="text-2xl font-bold">All Chats</p>
        {links.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/anon/${item}`);
              }}
              className="my-3 flex hover:bg-gray-400/20 cursor-pointer px-3 py-2 rounded items-center flex-row justify-between"
            >
              <div className="flex items-center">
                <span className="pi pi-circle-fill text-4xl"></span>
                <div className=" flex flex-col mx-2 px-2 justify-between">
                  <h5 className=" text-base font-extrabold">{item}</h5>
                </div>
              </div>
              <div
                onClick={(e) => generateChatLink(toast, item)}
                className="h-10 w-10 rounded-full grid bg-gray-400/20 transition hover:bg-gray-800 text-white flex-shrink-0 place-items-center"
              >
                <i className="pi pi-copy text-xl"></i>
              </div>
            </div>
          );
        })}
        <Toast ref={toast} />
      </div>
    </div>
  );
}
export default ChatList;
