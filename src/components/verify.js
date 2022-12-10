// Verifies if user should see someting
import Axios from "axios";
function App(setState) {
  const Endpoint = "https://chatterbox-v2-api.vercel.app/validate";
  Axios.post(
    Endpoint,
    {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  )
    .then(({ data }) => {
      setState(data.auth);
    })
    .catch((error) => {
      setState(false);
    });
}
export default App;
