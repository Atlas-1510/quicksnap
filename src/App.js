import "./App.css";
import ImageBanner from "./components/ImageBanner/ImageBanner";
import GlassBox from "./components/GlassBox/GlassBox";

import google from "./images/login-auth-icons/google.svg";
import facebook from "./images/login-auth-icons/facebook.png";
import apple from "./images/login-auth-icons/apple.svg";
import github from "./images/login-auth-icons/github.png";

function App() {
  return (
    <div className="h-full bg-gray-50">
      <div className="h-full grid place-items-center">
        <GlassBox>
          <div className="w-80">
            <h1 className="font-curly text-6xl m-4 text-center">QuickSnap</h1>
            <form className="flex items-center flex-col">
              <input
                className=" w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                placeholder="Email or username"
              />
              <input
                className="w-full my-1 p-1 border border-gray-300 rounded-sm bg-gray-50"
                type="password"
                placeholder="Password"
              />
              <button className="bg-blue-500 my-3 p-1 w-full border-0 rounded-sm text-white">
                Log In
              </button>
              <div className="flex m-1 w-full items-center">
                <div className="w-full h-px bg-gray-400"></div>
                <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
                  {" "}
                  OR{" "}
                </span>
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="mx-1 w-full flex">
                <div className="grid place-items-center m-2 w-full bg-white border rounded-md border-gray-200 p-1">
                  <img
                    className="m-1 h-7 left-0"
                    src={google}
                    alt="Google logo"
                  />
                </div>
                <div
                  className="grid place-items-center m-2 w-full border rounded-md text-white p-1"
                  style={{
                    backgroundColor: "rgb(24,119,242)",
                    borderColor: "rgb(24,119,242)",
                  }}
                >
                  <img
                    className="m-1 h-7 left-0"
                    src={facebook}
                    alt="Facebook logo"
                  />
                </div>
                <div className="grid place-items-center m-2 w-full bg-black border rounded-md border-black p-1">
                  <img
                    className="m-1 h-7 left-px"
                    src={apple}
                    alt="Apple logo"
                  />
                </div>
                <div className="grid place-items-center m-2 w-full bg-white border rounded-md border-gray-200 p-1">
                  <img
                    className="m-1 h-7 left-0"
                    src={github}
                    alt="GitHub logo"
                  />
                </div>
              </div>
              <div className="w-full my-3 h-px bg-gray-400"></div>
              <div className="my-1">
                <span>Don't have an account? </span>
                <span className=" text-blue-500 font-semibold">Sign up</span>
              </div>
            </form>
          </div>
        </GlassBox>
        <ImageBanner />
      </div>
    </div>
  );
}

export default App;
