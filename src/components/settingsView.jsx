import { useState, useRef } from "react";
import logo from "../img/chatter_box_logo_white.svg";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { date } from '../utils/helpers'

function Main({ links, setLink, userData }) {
  const [codes, setCodes] = useState([...links]);
  const navigate = useNavigate();
  const toast = useRef();
  return (
    <div className=" xl:m-2">
      <div id="chat-list-header" className="neon my-3">
      </div>
      <div
        className="neon flex py-2 bg-base-purple flex items-center justify-center backdrop-blur-md z-10 justify-center items-center py-2"
      >
        <img className="h-9 w-9" srcSet={logo} alt="" />
        <p className="mt-1 px-2">Settings</p>
      </div>
      <div className="flex flex-col p-6 items-center gap-y-8">
        <div className="relative h-36 bg-gray-400/20 w-36 rounded-full flex items-center justify-center">
          <i className=" pi pi-user text-5xl"></i>
        </div>
        <div className="pr-2 pl-4 border-l-8 w-full border-base-purple ">
          <p className="text-xl lowercase text-base-yellow font-bold ">
            @{userData.username}
          </p>
          <p className="text-sm">
            Joined on {date(userData.joinDate)}
          </p>
          <p id="email" className=" text-sm ">
            {userData.email || (
              <i className="pi pi-exclamation-triangle text-base-yellow px-1">
                <span className="text-white px-2 text-sm">
                  No email
                </span>
              </i>
            )}
          </p>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <button className="grid place-items-center h-9 rounded text-sm font-bold uppercase w-full bg-blue-400">Log out</button>
          <div className="flex flex-row gap-x-4 w-full">
            <button className="grid place-items-center h-9 rounded text-sm font-bold uppercase w-2/3 bg-base-purple">Edit profile</button>
            <button className="grid place-items-center h-9 rounded text-sm font-bold uppercase w-1/3 bg-red-500">Delete</button>
          </div>
        </div>
      </div>
      <div className="mx-6 mt-2">
        <p className="text-gray-200 border-gray-400/20 py-2 border-b-4 uppercase text-sm font-bold">
          Delete a chat link
        </p>
        {/* Lists or chats */}
        {codes.map((item, index) => {
          return (
            <div
              key={index}
              data-links={item}
              onClick={() => {navigate(`/anon/${item}`)}}
              className="my-3 flex hover:bg-gray-400/20 cursor-pointer px-4 py-3 rounded flex-row items-center justify-between"
            >
              <div className="flex gap-x-3 items-center">
                <span className="pi pi-circle-fill text-2xl"></span>
                <h5 className=" text-base font-bold">{item}</h5>
              </div>
              <button
                onClick={({ target }) => {
                  let link = target.dataset.links;
                  deleteLink(link, setCodes, toast, setLink, () => {
                    setCodes(data.links);
                    setLink(data.links);
                  });
                }}
                className="h-9 w-9 hover text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-300 grid place-items-center rounded-full">
                <i className=" pi pi-trash"></i>
              </button>
            </div>
          );
        })}
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default Main;
