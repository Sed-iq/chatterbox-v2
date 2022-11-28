import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./public/tailwind.css";
import "primeflex/primeflex.css";
import PrimeReact from "primereact/api";
import "./public/design.css";
import "./public/dashboard_design.css";

import App from "./App";
PrimeReact.ripple = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
