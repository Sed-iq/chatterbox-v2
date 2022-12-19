import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "./styles/design.css";
import "./styles/dashboard_design.css";
import './styles/tailwind.css'
import React from "react";
import ReactDOM from "react-dom/client";
import PrimeReact from "primereact/api";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import App from "./App";

PrimeReact.ripple = true;
TimeAgo.addDefaultLocale(en);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);