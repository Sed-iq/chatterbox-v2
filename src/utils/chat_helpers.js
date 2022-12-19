import axios from 'axios'
import { API_ENDPOINT } from './config'
 
export function generateChatLink(toast, setLinks, changeView, event, links, callback=(()=>{})) {
  const endpoint = `${API_ENDPOINT}/generate`;
  axios
    .put(endpoint, {}, 
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
        callback(data)
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

export const copyLinkConfirm = (event, toast, newLink) => {
  confirmPopup({
    target: event.target,
    message: `Would like to copy your new link (${newLink}), and share?`,
    accept: () => {
      var textField = document.createElement("textarea");
      textField.innerText = `This a chat link generated from chatterbox v2, https://chatterbox-v2.vercel.app/anon/${newLink} (You don't have to login to use it)`;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      toast.current.show({
        severity: "success",
        summary: "Link copied. You can send it to your target.",
        className: "text-sm",
      });
    },
    reject: (c) => {},
  });
};

export function deleteChatLink(link, setCodes, toast, setLink, callback = (()=>{})) {
  const endpoint = `${API_ENDPOINT}/code`;
  axios.put(endpoint,
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
      callback()
      toast.current.show({
        severity: "success",
        summary: "Deleted successfully!",
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: data.message || "Delete error!",
      });
    }
  })
  .catch((err) => {
    toast.current.show({
      severity: "error",
      summary: "Delete error!",
    });
  });
}

export function sendMessage(socket, setMessage, message, setChat, navigate, link) {
  if (message.trim().length === 0) {
  } else
    socket.current.emit(
      "message",
      {
        senders_token: localStorage.getItem("senders_token"),
        message: message.trim(),
        $token: localStorage.getItem("token"),
      },
      (data) => {
        setChat((prev) => [...prev, data]);
        saveChat({
            senders_token: data.senders_token,
            message: data.message,
            date: new Date(),
          },
          navigate,
          link
        );
        setMessage("");
      }
    );
}

export function saveChat(newChat, navigate, link) {
  let { message, senders_token, date } = newChat;
  const endpoint = `${API_ENDPOINT}/saveChat`;
  axios.post(
    endpoint,
    {
      message,
      senders_token,
      date,
      link,
    },
    {
      headers: {
        "x-senders-token": localStorage.getItem("senders_token"),
      },
    }
  )
  .then(() => {
    return true;
  })
  .catch((err) => {
    navigate("/chats");
    localStorage.removeItem("senders_token");
    console.log(err);
  });
}

export function getUserData(setState) {
  const endpoint = `${API_ENDPOINT}/dashboard`;
  axios.post(
    endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
  .then(({ data }) => {
    if (data.auth === true) setState(data.data);
    else setState(false);
  })
  .catch((err) => {
    setState(null);
    console.log(err);
  });
}