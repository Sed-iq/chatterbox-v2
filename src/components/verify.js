// Verifies if user should see someting
import Axios from "axios";
function App(setState) {
  const Endpoint = "http://localhost:5000/validate";
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
      console.log(data.auth);
    })
    .catch((error) => {
      setState(false);
    });
}
export default App;
