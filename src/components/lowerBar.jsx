import ChatList from "./chatList";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef } from "react";
import SettingsView from "./settingsView";
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
          GenerateLink(toast, setLinks, changeView, e, links);
        }}
        className="flex bg-blue-600 px-3 py-2 justify-center items-center"
      >
        <i className="pi pi-plus text-base md:text-2xl"></i>
      </div>
      <div
        id="logout"
        onClick={() => Logout(data, toast)}
        className="flex justify-center items-center"
      >
        <i className="pi pi-sign-out text-xl md:text-2xl"></i>
      </div>{" "}
      <div
        id="delete"
        onClick={(e) => {
          confim(e, data.navigate, toast, deleteACC);
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

function GenerateLink(toast, setLinks, changeView, event, links) {
  const Endpoint = "http://localhost:5000/generate";
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
      textField.innerText = `This a chat link generated from chatterbox v2, http://localhost:3000/anon/${newLink} (You don't have to login to use it)`;
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
const confim = (event, navigate, toast, func) => {
  confirmPopup({
    target: event.target,
    message: "Are you sure you want to delete your account?",
    icon: "pi pi-exclaimation-mark",
    accept: () => func(navigate, toast),
    reject: () => {},
  });
};
export default Bar;
