import logo from "./../public/images/chatter_box_logo_white.svg";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import ChatList from "./chatList";
import SettingsView from "./settingsView";
function deleteACC(navigate, toast) {
  const Endpoint = "http://localhost:5000/delete";
  Axios.delete(Endpoint, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then(({ data }) => {
      if (data.auth == true) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error deleting account",
        });
      }
    })
    .catch((err) =>
      toast.current.show({
        severity: "error",
        summary: "Error deleting account",
      })
    );
}
async function Logout({ navigate }, toast) {
  // Dispatches
  try {
    localStorage.removeItem("token");
    navigate("/login");
  } catch (err) {
    toast.current.show({
      severity: "error",
      summary: "Erorr logging out",
    });
  }
}
const Options = ({ data, changeView, links, setLinks }) => {
  const toast = useRef();
  return (
    <div id="sidebar" className="p-3">
      <div className=" bg-gray-900 p-1 px-2 rounded">
        <img srcSet={logo} alt="" title="Chatterbox v2" />
      </div>
      <div
        className="ico"
        onClick={() => changeView(<ChatList links={links} />)}
      >
        <i className="pi pi-home my-3 text-2xl"></i>
      </div>
      <div
        className="ico"
        onClick={() =>
          changeView(<SettingsView links={links} setLink={setLinks} />)
        }
      >
        <i className="pi pi-cog my-3 text-2xl"></i>
      </div>

      <div className="">
        <i id="add" className="pi pi-plus py-3 px-3 text-xl"></i>
      </div>
      <div className="ico" onClick={() => Logout(data, toast)}>
        {/* Logout */}
        <i className="pi pi-sign-out my-3 text-2xl"></i>
      </div>
      <div className="ico" onClick={() => deleteACC(data.navigate, toast)}>
        {/* Delete account */}
        <i className="pi pi-trash text-red-600 my-3 text-2xl"></i>
      </div>
      <Toast ref={toast} />
    </div>
  );
};
export default Options;
