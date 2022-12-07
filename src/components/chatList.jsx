import { Toast } from "primereact/toast";
import { useRef } from "react";
import logo from "./../public/images/chatter_box_logo_white.svg";
import { Link, useNavigate } from "react-router-dom";
function ChatList({ links }) {
  const navigate = useNavigate();
  const toast = useRef();
  return (
    <div id="cover">
      {/* Header */}
      <div id="chat-list-header" className=" text-base pb-2 px-2 neon">
        Chats
      </div>
      <div id="mobile-header" className="neon">
        <img src={logo} alt="" />
        <p>Chattebox v2</p>
      </div>
      <div id="chat-list">
        {links.map((item, index) => {
          return (
            <Link
              to={`/anon/${item}`}
              key={index}
              className="chat-list-item mx-3"
            >
              <div className="chat-color-icon pi pi-circle-fill text-4xl w-full text-center"></div>
              <p className="uruoob text-2xl ">{item}</p>
            </Link>
          );
        })}
      </div>
      <div id="recent-chats" className="my-4">
        <p className=" text-base my-2 font-bold">All Chats</p>
        {links.map((item, index) => {
          return (
            <div
              id="hori-chat-list"
              key={index}
              className=" my-3 flex hover:bg-gray-500 p-2 rounded flex-row justify-between"
            >
              <div
                onClick={() => {
                  navigate(`/anon/${item}`);
                }}
                className="flex"
              >
                <span className="pi pi-circle-fill text-4xl"></span>
                <div className=" flex flex-col mx-2 px-2 justify-between">
                  <h5 className=" text-sm font-extrabold">{item}</h5>
                </div>
              </div>
              <div
                onClick={() => {
                  navigate(`/anon/${item}`);
                }}
                className=" w-full"
              ></div>
              <div
                onClick={(e) => genConfirm(toast, item)}
                className="rounded  transition hover:bg-gray-800 text-white p-2"
              >
                <i className="pi pi-copy text-xl"></i>
              </div>
              <Toast ref={toast} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
const genConfirm = (toast, newLink) => {
  var textField = document.createElement("textarea");
  textField.innerText = `This is my chat link generated from chatterbox v2, http://localhost:3000/anon/${newLink} (You don't have to login to use it)`;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  toast.current.show({
    severity: "success",
    summary: "Link copied now send it to your target",
    className: "text-sm",
  });
};
export default ChatList;
