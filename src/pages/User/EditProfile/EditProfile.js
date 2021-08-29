import React, { useContext } from "react";
import { UserContext } from "../../Main";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";

import { auth } from "../../../firebase/firebase";
import Button from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";

function EditProfile({ exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, () => exit());
  const { profileImage, name, fullName } = useContext(UserContext);
  const email = auth.currentUser.email;

  const handleButtonClick = () => {
    document.querySelector("#profile-image-input").click();
  };

  return (
    <div ref={ref} className="w-1/4">
      {isComponentVisible && (
        <div
          className="bg-white border rounded-md border-gray-300 w-full h-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center">
            <div className=" h-20 w-20 md:h-36 md:w-36 border rounded-full overflow-hidden my-2">
              <img src={profileImage} alt="chosen display for current user" />
            </div>
            <span className="font-roboto text-xl md:text-2xl font-light my-2">
              {name}
            </span>
            <form>
              <div className="flex items-center justify-center my-2">
                <button
                  className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                  onClick={() => handleButtonClick()}
                >
                  Choose Profile
                </button>
                <input
                  type="file"
                  className="hidden"
                  id="profile-image-input"
                  // onChange={() => handleImageSelection()}
                  data-testid="test-profile-image-input"
                ></input>
                <button className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner">
                  Use Default
                </button>
              </div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                placeholder={fullName}
              />
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                placeholder={name}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                placeholder={email}
              />
              <div className="flex w-full items-center my-2">
                <div className="w-full h-px bg-gray-400"></div>
                <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
                  {" "}
                  Change Password{" "}
                </span>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
              />
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
              />
              <div className="flex w-full items-center mt-4 mb-2">
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-2">
                  <Button>Save</Button>
                </div>
                <div className="m-2">
                  <ButtonSecondary>Cancel</ButtonSecondary>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
