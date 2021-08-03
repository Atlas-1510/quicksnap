import "./App.css";
import ImageBanner from "./components/ImageBanner/ImageBanner";
import GlassBox from "./components/GlassBox/GlassBox";

import google from "./images/login-auth-icons/google.svg";
import facebook from "./images/login-auth-icons/facebook.png";
import apple from "./images/login-auth-icons/apple.svg";

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
                <span className=" mx-4 text-gray-400 font-bold">OR</span>
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="m-1 w-full">
                <div className="relative flex items-center justify-center my-2 w-full bg-white border rounded-sm border-gray-200 p-1">
                  <img
                    className="absolute m-2 h-6 left-0"
                    src={google}
                    alt="Google logo"
                  />
                  <span>Sign in with Google</span>
                </div>
                <div
                  className="relative flex justify-center items-center my-2 w-full border rounded-sm text-white p-1"
                  style={{
                    backgroundColor: "rgb(24,119,242)",
                    borderColor: "rgb(24,119,242)",
                  }}
                >
                  <img
                    className="absolute m-2 h-6 left-0"
                    src={facebook}
                    alt="Facebook logo"
                  />
                  <span>Sign in with Facebook</span>
                </div>
                <div className="relative flex items-center justify-center my-2 w-full bg-black border rounded-sm border-black p-1">
                  <img
                    className="absolute m-2 h-6 left-px"
                    src={apple}
                    alt="Apple logo"
                  />
                  <span className="text-white">Sign in with Apple</span>
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
