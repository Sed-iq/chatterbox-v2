import ChatList from "./chatList";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef } from "react";
import SettingsView from "./settingsView";
import { generateChatLink } from "../utils/chat_helpers";
const Bar = ({ data, changeView, links, setLinks }) => {
  const toast = useRef();
  return (
    <div className="flex flex-row justify-between px-6">
      <button
        onClick={() => changeView(<ChatList links={links} />)}
        id="home"
        className="flex justify-center items-center"
      >
        <i className="pi pi-home md:text-2xl"></i>
      </button>
      <button
        onClick={(e) => {
          generateChatLink(toast, setLinks, changeView, e, links, (data)=>{
            setLinks(data.link);
            genConfirm(e, toast, data.link[0]);
            changeView(<ChatList links={links} />);
          });
        }}
        className="flex bg-blue-600 px-3 h-9 w-9 py-2 justify-center rounded-full items-center"
      >
        <i className="pi pi-plus text-lg md:text-2xl"></i>
      </button>
      <button
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
        <i className="pi pi-cog text-lg md:text-2xl"></i>
      </button>

      <Toast ref={toast} />
      <ConfirmPopup />
    </div>
  );
};

export default Bar;
