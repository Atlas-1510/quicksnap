import "./App.css";
import ImageBanner from "./components/ImageBanner/ImageBanner";
import GlassBox from "./components/GlassBox/GlassBox";

function App() {
  return (
    <div className="h-full bg-gray-50">
      <div className="h-full grid place-items-center">
        <GlassBox>
          <div className="w-80">
            <h1 className="font-curly text-6xl m-4 text-center">QuickSnap</h1>
            <form className="flex items-center flex-col">
              <input
                className=" w-full my-1 p-1 border-2 border-gray-300 rounded-sm bg-gray-100"
                placeholder="Email or username"
              />
              <input
                className="w-full my-1 p-1 border-2 border-gray-300 rounded-sm bg-gray-100"
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
              <div className="m-1">
                Placeholder for login options (google, facebook, github)
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
