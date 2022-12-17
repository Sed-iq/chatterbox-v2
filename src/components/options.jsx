import logo from "../img/chatter_box_logo_white.svg";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef } from "react";
import ChatList from "./chatList";
import SettingsView from "./settingsView";

// Utils

import { copyLinkConfirm, generateChatLink } from "../utils/chat_helpers";
import { deleteAccountConfirmation, logout } from "../utils/auth_helpers";

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
          changeView(
            <SettingsView
              links={links}
              setLink={setLinks}
              userData={data.userData}
            />
          )
        }
      >
        <i className="pi pi-cog my-3 text-2xl"></i>
      </div>
      <div
        className=""
        onClick={(e) => {
          generateChatLink(toast, setLinks, changeView, e, links, (data)=>{
            setLinks(data.link);
            copyLinkConfirm(e, toast, data.link[0]);
            changeView(<ChatList links={links} />);
          });
        }}
      >
        <i id="add" className="pi pi-plus py-3 px-3 text-xl"></i>
      </div>
      <div className="ico" onClick={() => logout(data, toast)}>
        {/* Logout */}
        <i className="pi pi-sign-out my-3 text-2xl"></i>
      </div>
      <div
        className="ico"
        onClick={(e) => {
          deleteAccountConfirmation(e, data.navigate, toast);
        }}
      >
        {/* Delete account */}
        <i className="pi pi-trash text-red-600 my-3 text-2xl"></i>
      </div>
      <ConfirmPopup />
      <Toast ref={toast} />
    </div>
  );
};

export default Options;
