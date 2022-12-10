import logo from "./../public/images/chatter_box_logo_white.svg";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef } from "react";
import ChatList from "./chatList";
import SettingsView from "./settingsView";
function deleteACC(navigate, toast) {
  const Endpoint = "https://chatterbox-v2-api.vercel.app/delete";
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
          GenerateLink(toast, setLinks, changeView, e, links);
        }}
      >
        <i id="add" className="pi pi-plus py-3 px-3 text-xl"></i>
      </div>
      <div className="ico" onClick={() => Logout(data, toast)}>
        {/* Logout */}
        <i className="pi pi-sign-out my-3 text-2xl"></i>
      </div>
      <div
        className="ico"
        onClick={(e) => {
          confim(e, data.navigate, toast, deleteACC);
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
function GenerateLink(toast, setLinks, changeView, event, links) {
  const Endpoint = "https://chatterbox-v2-api.vercel.app/generate";
  Axios.put(
    Endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(async ({ data }) => {
      if (data.auth === true) {
        toast.current.show({
          severity: "success",
          summary: "Link generated successfully. Check your settings to see it",
          className: "text-sm",
        });

        setLinks(data.link);
        genConfirm(event, toast, data.link[0]);
        changeView(<ChatList links={links} />);
      } else {
        toast.current.show({
          severity: "error",
          className: "text-sm",
          summary: "Error, link terminated.",
        });
      }
    })
    .catch((err) => {
      toast.current.show({
        className: "text-sm",
        severity: "error",
        summary: "Error generatng link.",
      });
    });
}
const genConfirm = (event, toast, newLink) => {
  confirmPopup({
    target: event.target,
    message: `Would like to copy your new link (${newLink}), and share to the target?`,
    accept: () => {
      var textField = document.createElement("textarea");
      textField.innerText = `This a chat link generated from chatterbox v2, https://chatterbox-v2-api.vercel.app/anon/${newLink} (You don't have to login to use it)`;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      toast.current.show({
        severity: "success",
        summary: "Link copied now send it to your target.",
        className: "text-sm",
      });
    },
    reject: (c) => {},
  });
};
const confim = (event, navigate, toast, func) => {
  confirmPopup({
    target: event.target,
    message: "Are you sure you want to delete your account?",
    icon: "pi pi-exclaimation-mark",
    accept: () => func(navigate, toast),
    reject: () => {},
  });
};

export default Options;
