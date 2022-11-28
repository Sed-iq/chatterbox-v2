import { Link } from "react-router-dom";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Footer from "./footer";

function reqornot(req, placeholder, type) {
  return req === true ? (
    <InputText
      required
      minLength={4}
      type={type}
      placeholder={placeholder}
      className="lg:w-full border-0 rounded-l-none bg-gray-900"
    />
  ) : (
    <InputText
      minLength={4}
      type={type}
      placeholder={placeholder}
      className="lg:w-full border-0 rounded-l-none bg-gray-900"
    />
  );
}
function Inputs({ placeholder, type, ico, clas, req }) {
  return (
    <div id="inputs" className={`w-full flex lg:mt-16 ${clas}`}>
      <div className=" flex justify-center px-2 rounded-l bg-gray-900  items-center  ">
        <i className={ico}></i>
      </div>
      <div id="input_holder" className="full">
        {reqornot(req, placeholder, type)}
      </div>
    </div>
  );
}
function RegisterHandler(data, navigate, toast, setIco, setBtnState) {
  data.preventDefault();
  const username = document.forms[0][0].value;
  const email = document.forms[0][2].value,
    password = document.forms[0][1].value,
    Endpoint = "http://localhost:5000/register";
  axios
    .post(Endpoint, {
      username,
      password,
      email,
    })
    .then(({ data }) => {
      if (data.auth === true) navigate("/login");
      else {
        setBtnState(false);
        setIco("");
        toast.current.show({
          className: "sm:text-sm text-black text-xs",
          severity: "error",
          detail: "There seems to be an error",
          summary: "Error Registering you",
        });
      }
    })
    .catch((err) => {
      setBtnState(false);
      setIco("");
      toast.current.show({
        className: "sm:text-sm text-black text-xs",
        severity: "error",
        detail: "There seems to be an error",
        summary: "Error Registering you",
      });
    });
}

function SubmitHandler(data, navigate, toast, setIco, setBtnState) {
  data.preventDefault();
  setIco("pi pi-spin pi-spinner");
  setBtnState(true);
  const username = document.forms[0][0].value;
  const password = document.forms[0][1].value;
  const Endpoint = "http://localhost:5000/login";
  axios
    .post(
      Endpoint,
      {
        username,
        password,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => {
      // Saving in the localstorage

      if (data.auth === true) {
        navigate("/dashboard");
        localStorage.setItem("token", data.token);
      } else {
        setBtnState(false);
        setIco("");
        toast.current.show({
          className: "sm:text-sm text-xs",
          severity: "error",
          detail: "Password or Username doesn't exist.",
          summary: "Incorrect username or password",
        });
      }
    })
    .catch((err) => {
      setBtnState(false);
      setIco("");
      toast.current.show({
        className: "sm:text-sm text-black text-xs",
        severity: "error",
        detail: "There seems to be an error",
        summary: "Error Loggin in",
      });
    });
}

const App = ({
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
  const [btn_ico, setIco] = useState("");
  const [btn_state, setBtnState] = useState(false);
  const toast = useRef("");
  return (
    <div id="cover" className=" h-screen  flex flex-col ">
      <nav className="p-4">
        <Link to={"/"} id="back" className=" p-3  ">
          <i className="pi pi-angle-double-left "></i>
        </Link>
      </nav>
      <form
        action="#"
        onSubmit={(e) => {
          if (reg === true)
            RegisterHandler(e, navigate, toast, setIco, setBtnState);
          else SubmitHandler(e, navigate, toast, setIco, setBtnState);
        }}
      >
        <div
          id="login"
          className="flex flex-col  lg:h-full lg:flex-row  lg:items-center xl:flex-row "
        >
          <div
            id="illus"
            className=" flex flex-col  justify-evenly items-center p-3"
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
                <h2 className="text text-center lg:text-xl">{logoHeader}</h2>

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
                    className="text- neon p-button-warning"
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
export default App;
{
  /*<form onSubmit={(e) => SubmitHandler(e, navigate, state)}>
          <input type="text" placeholder="username" /> <br /> <br />
          <input type="password" placeholder=" ***" /> <br /> <br />
          <button> Submit</button>
        </form>
        <p>{error}</p>*/
}
