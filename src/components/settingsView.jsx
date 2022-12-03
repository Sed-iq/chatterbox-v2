import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Axios from "axios";
function Main({ links, setLink }) {
  const [codes, setCodes] = useState([...links]);
  const toast = useRef();
  return (
    <div className=" m-2">
      <div className="neon my-3">settings</div>
      <div id="profile-holder" className=" ">
        <div id="profile-icon">
          <i className=" pi pi-user text-5xl"></i>
        </div>
        <div id="user-data" className="px-2">
          <p id="name" className="black_north text-xl">
            Ikki Tenrio
          </p>
          <p id="createdAt" className=" uruoob text-xl pt-2">
            Joined on 17/4/2003
          </p>
          <p id="email" className=" uruoob text-base py-2">
            <i className="pi pi-exclamation-triangle text-yellow-400 px-1"></i>
            Email not avalable
          </p>
        </div>
      </div>
      <div id="link-lists" className=" black_north border-b-2 xl:pt-4">
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
            className=" my-3 flex hover:bg-gray-500 p-2 rounded flex-row justify-between"
          >
            <div className=" flex flex-row">
              <span className="pi pi-circle-fill text-4xl"></span>
              <div className=" flex flex-col mx-2 px-2 justify-between">
                <h5 className=" text-sm font-extrabold">{item}</h5>
                <p className=" text-xs font-light">Hey babe...</p>
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
        console.log("done");
        // let newCode = link.filter((x) => {
        //   return x !== link;
        // });
        // setCodes(newCode);
        // setLink(newCode);
        // toast.current.show({
        //   severity: "success",
        //   summary: "Deleted successfully",
        // });
      } else {
        console.log(data);
        toast.current.show({
          severity: "error",
          summary: data.message || "Delete error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Delete error",
      });
    });
}

export default Main;
