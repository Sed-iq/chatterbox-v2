import logo from "./../public/images/chatter_box_logo_white.svg";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function nav() {
  return (
    <nav className="  py-3 flex flex-row mb-16 sticky top-0 sm:justify-around justify-between items-center bg-black-alpha-20">
      <Link
        to={"/"}
        id="logo"
        className="sm:text-lg sm:m-0 outline-none ml-2 flex flex-row items-center justify-center text-xs"
      >
        <div>
          <img srcSet={logo} alt="" />
        </div>
        <h2 className="ml-2">Chatterbox v2</h2>
      </Link>
      <div id="login_reg sm:flex flex-row">
        <Link to={"/login"}>
          <Button
            label="Login"
            className="text-gray-800 mx-2 black_north px-2 sm:text-base text-xs py-2 p-button-warning font-bold"
          />
        </Link>
        <Link to={"/register"}>
          <Button
            label="Register"
            className="text-gray-800 mx-2 black_north px-2 sm:text-base text-xs py-2 p-button-info font-bold"
          />
        </Link>
      </div>
    </nav>
  );
}
export default nav;
