import { useState, useRef } from "react";
import logo from "./../public/images/chatter_box_logo_white.svg";
import { Toast } from "primereact/toast";
import Axios from "axios";
function date(x) {
  let _ = new Date(x).getDay();
  let day;
  switch (_) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    default:
      break;
  }
  let month = new Date(x).getMonth();
  let year = new Date(x).getFullYear();
  let date = new Date(x).getDate();
  return `${day}, ${date} of ${month} ${year}`;
}

function Main({ links, setLink, userData }) {
  const [codes, setCodes] = useState([...links]);
  const toast = useRef();
  return (
    <div className=" xl:m-2">
      <div id="chat-list-header" className="neon my-3">
        Settings
      </div>
      <div
        id="mobile-header"
        className="neon flex justify-center items-center py-2"
      >
        <img srcSet={logo} alt="" />
        <p>Settings</p>
      </div>
      <div id="profile-holder" className=" ">
        <div id="profile-icon">
          <i className=" pi pi-user text-5xl"></i>
        </div>
        <div id="user-data" className="px-2 ">
          <p id="name" className="black_north text-xl">
            {userData.username}
          </p>
          <p id="createdAt" className=" black_north textx-sm pt-2">
            Joined on {date(userData.joinDate)}
          </p>
          <p id="email" className=" text-sm ">
            {userData.email || (
              <i className="pi pi-exclamation-triangle text-yellow-400 px-1">
                <span className="text-white black_north px-2 text-sm">
                  No email
                </span>
              </i>
            )}
          </p>
        </div>
      </div>
      <div
        id="link-lists"
        className=" black_north mx-3 my-3 lg:m-0 border-b-2 xl:pt-4"
      >
        <p>Delete a chat link</p>
      </div>
      {/* Lists or chats */}

      {codes.map((item, index) => {
        return (
          <div
            id="hori-chat-list"
            key={index}
            data-links={item}
            onClick={({ target }) => {
              let link = target.dataset.links;
              deleteLink(link, setCodes, toast, setLink);
            }}
            className=" my-3 flex hover:bg-gray-500 p-3 lg:p-2 rounded flex-row justify-between"
          >
            <div className=" flex flex-row">
              <span className="pi pi-circle-fill text-4xl"></span>
              <div className=" flex flex-col mx-2 px-2 justify-between">
                <h5 className=" text-sm font-extrabold">{item}</h5>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <i className=" pi pi-trash text-red-500"></i>
            </div>
          </div>
        );
      })}
      <Toast ref={toast} />
    </div>
  );
}
function deleteLink(link, setCodes, toast, setLink) {
  const Endpoint = `http://localhost:5000/code`;
  Axios.put(
    Endpoint,
    {
      code: link,
    },
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(({ data }) => {
      if (data.auth == true) {
        setCodes(data.links);
        setLink(data.links);
        toast.current.show({
          severity: "success",
          summary: "Deleted successfully!",
        });
      } else {
        console.log(data);
        toast.current.show({
          severity: "error",
          summary: data.message || "Delete error!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Delete error!",
      });
    });
}

export default Main;
