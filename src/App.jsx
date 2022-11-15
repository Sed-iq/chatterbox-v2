import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./body.jsx";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
