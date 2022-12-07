import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body.jsx";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";
import ChatSpace from "./chatspace";
import Err from "./404";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anon/:link" element={<ChatSpace />} />
        <Route path="*" element={<Err error={"Page not found"} />} />
        <Route
          path="/error"
          element={<Err error={"There seems to be an error with the link"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
