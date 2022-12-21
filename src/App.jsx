import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./layouts/body.jsx";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";
import Register from "./layouts/Register";
import ChatSpace from "./layouts/ChatSpace";
import Error from "./layouts/errors";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anon/:link" element={<ChatSpace />} />
        <Route
          path="/error"
          element={<Error code="300" error={"There seems to be an error with the link"} />}
        />
        <Route path="*" element={<Error code="404" message={"Page not found"} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
