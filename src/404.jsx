import e_404 from "./public/images/404.svg";
import { Link } from "react-router-dom";
const App = ({ error }) => {
  return (
    <>
      <p className=" absolute neon p-3 sm:p-4 right-0">Chatterbox v2</p>
      <div
        id="error"
        className="flex flex-col h-screen justify-center items-center"
      >
        <div>
          <img srcSet={e_404} alt="Error icon" />
        </div>
        <p>{error}...</p>
        <Link to={"/"} className={"decoration-transparent outline-none"}>
          <button className="text-sm bg-violet-700 p-2 rounded mt-5">
            <i className=" pi pi-angle-left text-sm mr-2"></i>
            Go home
          </button>
        </Link>
      </div>
    </>
  );
};
export default App;
