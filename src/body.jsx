import { Link } from "react-router-dom";
import Header from "./components/navbar";
import Footer from "./components/footer";
import { useRef } from "react";
import { Button } from "primereact/button";
import message from "./public/images/message.png";
import workingico from "./public/images/Team_work_Two_Color.svg";
import teamArrowIco from "./public/images/Team_arrow.svg";
function App() {
  return (
    <>
      <Header />
      <div
        id="top_holder"
        className=" flex flex-col sm:flex-row sm:justify-around justify-between"
      >
        <>
          <h2
            id="title-phone"
            className="lg:text-2xl md:text-xl sm:p-0  text-lg black_north"
          >
            Truly{" "}
            <span className="p-2 neon bg-indigo-500 rounded">Instant</span>{" "}
            messaging.
          </h2>
          <div id="img_top">
            <img srcSet={message} alt="" />
          </div>
          <div id="intro">
            {/* intro */}
            <h2
              id="title-pc"
              className="lg:text-2xl md:text-xl sm:p-0 px-10 text-sm black_north"
            >
              Truly{" "}
              <span className="p-2 neon bg-indigo-500 rounded">Instant</span>{" "}
              messaging.
            </h2>
            {/* Description */}
            <p id="desc" className="sm:py-4 p-4 ">
              Messaging with ease, just with a{" "}
              <span className="p-2 mb-2 neon bg-indigo-700 rounded">Click</span>{" "}
              of a button , you can easily communicate with your target person.
            </p>
          </div>
        </>
      </div>

      <div
        id="top_holder"
        className=" flex flex-col sm:my-36 my-16 sm:flex-row-reverse sm:justify-around justify-between"
      >
        <>
          <h2
            id="title-phone"
            className="lg:text-2xl md:text-xl sm:p-0  text-lg black_north"
          >
            One Click link
            <span className="p-2 neon bg-indigo-500 rounded">
              Generate
            </span>{" "}
            feature.
          </h2>
          <div id="working_icon">
            <img srcSet={workingico} alt="Working icon" />
          </div>
          <div id="intro">
            {/* intro */}
            <h2
              id="title-pc"
              className="lg:text-2xl md:text-xl sm:p-0  text-lg black_north"
            >
              One Click link
              <span className="p-2 neon bg-indigo-500 rounded">
                Generate
              </span>{" "}
              feature.
            </h2>
            {/* Description */}
            <p id="desc" className="sm:py-4 p-4 ">
              When you register with us , with our one
              <span className="p-2 m-2 neon bg-indigo-700 rounded">
                Click
              </span>{" "}
              feature, you can generate channels which targets can use to send
              you messages.
            </p>
          </div>
        </>
      </div>
      <div
        id="top_holder"
        className=" flex flex-col sm:my-36 my-16 sm:flex-row sm:justify-around justify-between"
      >
        <>
          <h2
            id="title-phone"
            className="lg:text-2xl md:text-xl sm:p-0  text-lg black_north"
          >
            One way {""}
            <span className="p-2 neon bg-indigo-500 rounded">Login</span>{" "}
            system.
          </h2>
          <div id="working_icon">
            <img srcSet={teamArrowIco} alt="Working icon" />
          </div>
          <div id="intro">
            {/* intro */}
            <h2
              id="title-pc"
              className="lg:text-2xl md:text-xl sm:p-0  text-lg black_north"
            >
              One way{" "}
              <span className="p-2 neon bg-indigo-500 rounded">Login</span>{" "}
              system.
            </h2>
            {/* Description */}
            <p id="desc" className="sm:py-4 p-4 ">
              When others click on your link, they don't have to be{" "}
              <span className="p-2 m-2 neon bg-indigo-700 rounded">
                Registered
              </span>{" "}
              with us to send you messages.
            </p>
            <div className="my-9">
              <h2 className="black_north sm:text-xl text-lg  sm:text-justify text-center">
                Experience quick and lightweight messaging. Join us Today!
              </h2>
              <Link
                to={"/register"}
                className="flex my-10 sm:justify-start justify-center"
              >
                <Button
                  label="Register with us"
                  className="text-gray-800 mx-2 black_north px-2 sm:text-base text-sm py-2 p-button-danger font-bold"
                />
              </Link>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
}

export default App;
// {
//   /* <div>
// <Link to={"/login"}>Login</Link> <br />
// <Link to={"/register"}>Register</Link> <br />
// <Link to={"/dashboard"}>Dashboard</Link> <br />
// </div> */
// }
