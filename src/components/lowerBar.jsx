import ChatList from "./chatList";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef } from "react";
import SettingsView from "./settingsView";
import {deleteAccountConfirmation, logout } from "../utils/auth_helpers";
import { generateChatLink } from "../utils/chat_helpers";
const Bar = ({ data, changeView, links, setLinks }) => {
  const toast = useRef();
  return (
    <div id="bar">
      <div
        onClick={() => changeView(<ChatList links={links} />)}
        id="home"
        className="flex justify-center items-center"
      >
        <i className="pi pi-home text-xl md:text-2xl"></i>
      </div>
      <div
        onClick={() =>
          changeView(
            <SettingsView
              links={links}
              setLink={setLinks}
              userData={data.userData}
            />
          )
        }
        id="settings"
        className="flex justify-center items-center"
      >
        <i className="pi pi-cog text-xl md:text-2xl"></i>
      </div>
      <div
        id="add"
        onClick={(e) => {
          generateChatLink(toast, setLinks, changeView, e, links, (data)=>{
            setLinks(data.link);
            genConfirm(e, toast, data.link[0]);
            changeView(<ChatList links={links} />);
          });
        }}
        className="flex bg-blue-600 px-3 py-2 justify-center items-center"
      >
        <i className="pi pi-plus text-base md:text-2xl"></i>
      </div>
      <div
        id="logout"
        onClick={() => logout(data, toast)}
        className="flex justify-center items-center"
      >
        <i className="pi pi-sign-out text-xl md:text-2xl"></i>
      </div>{" "}
      <div
        id="delete"
        onClick={(e) => {
          deleteAccountConfirmation(e, data.navigate, toast);
        }}
        className="flex justify-center items-center"
      >
        <i className="pi pi-trash text-red-400 text-xl md:text-2xl"></i>
      </div>
      <Toast ref={toast} />
      <ConfirmPopup />
    </div>
  );
};

export default Bar;
