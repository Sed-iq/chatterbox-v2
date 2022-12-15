import axios from 'axios';

export function onRegister(data, navigate, toast, setIcon, setBtnState) {
  data.preventDefault();
  const username = document.forms[0][0].value;
  const email = document.forms[0][2].value,
    password = document.forms[0][1].value,
    endpoint = "https://chatterbox-v2-api.vercel.app/register";
  const charexp = /[?/<>,.:"'{}\[\]!@#$%$^&*()_+=~]/;
  const spc = /[\s ]/g;
  const digit = /[\d]/g;
  console.log(digit.test(username));
  if (username == "" || password == "") {
    toast.current.show({
      className: "sm:text-sm text-black text-xs",
      severity: "error",
      summary: "Username or password can't empty",
    });
  } else if (digit.test(username)) {
    toast.current.show({
      className: "sm:text-sm text-black text-xs",
      severity: "error",
      summary: "No digits allowed in Username",
    });
  } else if (spc.test(username)) {
    toast.current.show({
      className: "sm:text-sm text-black text-xs",
      severity: "error",
      summary: "Username cannot have space",
    });
  } else if (charexp.test(username)) {
    toast.current.show({
      className: "sm:text-sm text-black text-xs",
      severity: "error",
      summary: "Username should not have special characters",
    });
  } else {
    axios
      .post(endpoint, {
        username,
        password,
        email,
      })
      .then(({ data }) => {
        if (data.auth === true) navigate("/login");
        else {
          setBtnState(false);
          setIcon("");
          toast.current.show({
            className: "sm:text-sm text-black text-xs",
            severity: "error",
            summary: data.message || "Error Registering you",
          });
        }
      })
      .catch((err) => {
        setBtnState(false);
        setIcon("");
        toast.current.show({
          className: "sm:text-sm text-black text-xs",
          severity: "error",
          detail: "There seems to be an error",
          summary: "Error registering you",
        });
      });
  }
}

export function onLogin(data, navigate, toast, setIcon, setBtnState) {
  data.preventDefault();
  setIcon("pi pi-spin pi-spinner");
  setBtnState(true);
  const username = document.forms[0][0].value;
  const password = document.forms[0][1].value;
  const endpoint = "https://chatterbox-v2-api.vercel.app/login";
  axios
    .post(
      endpoint,
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
        setIcon("");
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
      setIcon("");
      toast.current.show({
        className: "sm:text-sm text-black text-xs",
        severity: "error",
        detail: "There seems to be an error",
        summary: "Error Loggin in",
      });
    });
}
