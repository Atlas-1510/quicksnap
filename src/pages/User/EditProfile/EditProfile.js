import React, { useContext, useState } from "react";
import { UserContext } from "../../Main";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";

import { auth } from "../../../firebase/firebase";
import firebase from "firebase";
import Button from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";

import generateProfileImage from "../../../utils/generateProfileImage/generateProfileImage";

function EditProfile({ exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, () => exit());
  const { profileImage, name, fullName } = useContext(UserContext);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [formFullName, setFormFullName] = useState(fullName);
  const [formUserName, setFormUserName] = useState(name);
  const [formEmail, setFormEmail] = useState(auth.currentUser.email);
  const [formCurrentPassword, setFormCurrentPassword] = useState("");
  const [formNewPassword, setFormNewPassword] = useState("");

  const handleChooseProfileButtonClick = (e) => {
    e.preventDefault();
    e.target.blur();
    document.querySelector("#profile-image-input").click();
  };

  const handleUseDefaultButtonClick = (e) => {
    e.preventDefault();
    const initialsImage = generateProfileImage(fullName);
    setNewProfileImage(initialsImage);
  };

  const handleImageSelection = () => {
    const chosenImage = document.querySelector("#profile-image-input").files[0];
    setNewProfileImage(URL.createObjectURL(chosenImage));

    // TODO: add image compression to new profile image if file is too big
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    // use newProfileImage state to update user document, not the value from the image input.
    const newUserDoc = {};
    if (formFullName !== fullName) {
      newUserDoc.fullName = formFullName;
    }
    if (formUserName !== name) {
      newUserDoc.userName = formUserName;
    }
    if (formEmail !== auth.currentUser.email) {
      console.log(`email changed: ${formEmail}`);
      auth.currentUser.updateEmail(formEmail);
    }
    if (formNewPassword !== "") {
      console.log(`formNewPassword: ${formNewPassword}`);
      const cred = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        formCurrentPassword
      );
      auth.currentUser
        .reauthenticateWithCredential(cred)
        .then(() => auth.currentUser.updatePassword(formNewPassword));
    }

    console.log(newUserDoc);
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
              <img
                src={newProfileImage ? newProfileImage : profileImage}
                alt="chosen display for current user"
              />
            </div>
            <span className="font-roboto text-xl md:text-2xl font-light my-2">
              {name}
            </span>
            <form>
              <div className="flex items-center justify-center my-2">
                <button
                  className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold md:hover:bg-gray-300 md:hover:shadow-inner"
                  onClick={handleChooseProfileButtonClick}
                >
                  Choose Profile
                </button>
                <input
                  type="file"
                  className="hidden"
                  id="profile-image-input"
                  onChange={handleImageSelection}
                  data-testid="test-profile-image-input"
                ></input>
                <button
                  className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                  onClick={handleUseDefaultButtonClick}
                >
                  Use Default
                </button>
              </div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formFullName}
                onChange={(e) => setFormFullName(e.target.value)}
              />
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formUserName}
                onChange={(e) => setFormUserName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              <div className="flex w-full items-center my-2">
                <div className="w-full h-px bg-gray-400"></div>
                <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
                  {" "}
                  Change Password{" "}
                </span>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formCurrentPassword}
                onChange={(e) => setFormCurrentPassword(e.target.value)}
              />
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formNewPassword}
                onChange={(e) => setFormNewPassword(e.target.value)}
              />
              <div className="flex w-full items-center mt-4 mb-2">
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-2" onClick={(e) => handleFormSubmission(e)}>
                  <Button>Save</Button>
                  <input type="submit" className="hidden" id="submit-form" />
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
