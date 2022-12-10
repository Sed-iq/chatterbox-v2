import Axios from "axios";

function App(newChat, navigate, link) {
  let { message, senders_token, date } = newChat;
  const Endpoint = "https://chatterbox-v2-api.vercel.app/saveChat";
  Axios.post(
    Endpoint,
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
export default App;
