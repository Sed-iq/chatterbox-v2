import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Footer from "./footer";
import { onLogin, onRegister } from "../utils/event_handlers";

function Inputs({ placeholder, type, ico, clas, required }) {
  return (
    <div id="inputs" className={`w-full flex lg:mt-16 ${clas}`}>
      <div className="flex flex-row bg-gray-900 w-5/6 group focus-within:border-[#FFF59D] px-2 border-gray-900 border-2 rounded-md">
        <div className="flex justify-center pr-4 pl-2 border-r-2 border-gray-800 rounded-l items-center  ">
          <i className={ico + " group-focus-within:text-[#FFF59D]"} ></i>
        </div>
        <div id="input_holder" className="full">
          <InputText
            required={required ? required : false}
            minLength={4}
            type={type}
            placeholder={placeholder}
            className="lg:w-full text-sm border-0 bg-transparent focus:!shadow-none h-10 rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
}

const Form = ({
  icon,
  navigate,
  setError,
  reg,
  logoHeader,
  illus_text,
  btn_text,
  either_text,
  either_route,
}) => {
  const [btn_ico, setIcon] = useState("");
  const [btn_state, setBtnState] = useState(false);
  const toast = useRef("");
  return (
    <div id="cover" className=" h-screen flex flex-col ">
      <nav className="p-4 flex">
        <Link to={"/"} className="h-9 !w-9 !min-w-0 rounded-full p-button p-button-warning justify-center items-center flex mr-auto">
          <i className="pi pi-angle-double-left"></i>
        </Link>
      </nav>
      <form
        action="#"
        onSubmit={(e) => {
          if (reg === true)
            onRegister(e, navigate, toast, setIcon, setBtnState);
          else onLogin(e, navigate, toast, setIcon, setBtnState);
        }}
      >
        <div
          id="login"
          className="flex flex-col  lg:h-full lg:flex-row  lg:items-center xl:flex-row "
        >
          <div
            id="illus"
            className=" flex flex-col justify-evenly items-center p-3"
          >
            {/* Image */}
            <div>
              <img srcSet={icon} alt="icon" />
            </div>
            {illus_text}
          </div>

          <div id="login_page" className=" ">
            {/* Login proper */}
            <div className="login pt-5 px-3">
              <div className="login_inside ">
                <h2 className="text text-3xl text-center">{logoHeader}</h2>

                <Inputs
                  placeholder={"Username"}
                  type={"text"}
                  ico={"pi pi-user"}
                />
                <Inputs
                  clas={"lg:mt-0"}
                  placeholder={"Your password"}
                  type="password"
                  ico="pi pi-lock"
                />
                {regChck(reg)}

                <div className=" flex lg:my-3 justify-center">
                  <Button
                    disabled={btn_state}
                    label={btn_text}
                    className="text-sm w-5/6 neon p-button-warning"
                    iconPos="start"
                    icon={btn_ico}
                  />
                </div>
                <Link to={either_route}>
                  <p id="reg_link">{either_text}</p>
                </Link>
                <Footer />
                <Toast ref={toast} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

function regChck(reg) {
  if (reg === true) {
    return (
      <Inputs
        clas={"mt-0"}
        ico={"pi pi-at"}
        req={false}
        placeholder="Email (optional)"
      />
    );
  }
}
export default Form;