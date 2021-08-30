import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Main";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import useIsFirstRender from "../../../hooks/useIsFirstRender/useIsFirstRender";

import { auth } from "../../../firebase/firebase";
import firebase from "firebase";
import Button from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";

import generateProfileImage from "../../../utils/generateProfileImage/generateProfileImage";
import postToStorage from "../../../firebase/postToStorage";
import postToFirestore from "../../../firebase/postToFirestore";

function EditProfile({ exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, () => exit());
  const { profileImage, name, fullName, uid, customProfileImage } =
    useContext(UserContext);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(false);
  const [formFullName, setFormFullName] = useState(fullName);
  const [formUserName, setFormUserName] = useState(name);
  const [formEmail, setFormEmail] = useState(auth.currentUser.email);
  const [formCurrentPassword, setFormCurrentPassword] = useState("");
  const [formNewPassword, setFormNewPassword] = useState("");
  const [section, setSection] = useState("nameAndImage");

  const isFirstRender = useIsFirstRender();
  const [showChangeEmailOrPassword, setShowChangeEmailOrPassword] =
    useState(false);

  useEffect(() => {
    if (isFirstRender) {
      const user = auth.currentUser;
      if (!user.providerData[0].providerId === "password") {
        setShowChangeEmailOrPassword(false);
      }
    }
  }, [showChangeEmailOrPassword]);

  const handleChooseProfileButtonClick = (e) => {
    e.preventDefault();
    e.target.blur();
    document.querySelector("#profile-image-input").click();
  };

  const handleUseDefaultButtonClick = (e) => {
    e.preventDefault();
    const initialsImage = generateProfileImage(fullName);
    setDefaultImage(true);
    setNewProfileImage(initialsImage);
  };

  const handleImageSelection = () => {
    const chosenImage = document.querySelector("#profile-image-input").files[0];
    setNewProfileImage(chosenImage);
    setDefaultImage(false);
  };

  const handleNameOrImageChange = async (e) => {
    e.preventDefault();
    console.log(newProfileImage);
    // use newProfileImage state to update user document, not the value from the image input.
    const newUserDoc = {};
    if (formFullName !== fullName) {
      newUserDoc.fullName = formFullName;
    }
    if (formUserName !== name) {
      newUserDoc.userName = formUserName;
    }
    if (newProfileImage) {
      const uploadURL = await postToStorage(
        newProfileImage,
        `${uid}/profileImages/`
      );
      newUserDoc.profileImage = uploadURL;
      // TODO: add image compression to new profile image if file is too big
    }
    postToFirestore(newUserDoc, `/users/${uid}`, true);
    console.log(newUserDoc);
  };

  const handleEmailChange = () => {
    console.log(`email changed: ${formEmail}`);
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      formCurrentPassword
    );
    auth.currentUser
      .reauthenticateWithCredential(cred)
      .then(() => auth.currentUser.updateEmail(formEmail));
  };

  const cancelEmailChange = () => {
    setFormEmail(auth.currentUser.email);
    setFormCurrentPassword("");
    setSection("nameAndImage");
  };

  const handlePasswordChange = () => {
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      formCurrentPassword
    );
    auth.currentUser
      .reauthenticateWithCredential(cred)
      .then(() => auth.currentUser.updatePassword(formNewPassword));
  };

  const cancelPasswordChange = () => {
    setFormCurrentPassword("");
    setFormNewPassword("");
    setSection("nameAndImage");
  };

  return (
    <div ref={ref} className="w-1/4">
      {isComponentVisible && (
        <div
          className="bg-white border rounded-md border-gray-300 w-full h-full p-4 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {section === "nameAndImage" && (
            <div className="flex flex-col items-center w-full px-2">
              <div className="relative h-20 w-20 md:h-36 md:w-36 border rounded-full overflow-hidden my-2">
                {/* ternary operators below necessary because the SVG from the default image needs to be loaded
                differently (as a normal image), while a user input image needs to be loaded as a file blob */}
                <img
                  src={
                    newProfileImage
                      ? defaultImage
                        ? newProfileImage
                        : URL.createObjectURL(newProfileImage)
                      : profileImage
                  }
                  alt="chosen display for current user"
                />
                <input
                  type="file"
                  className="hidden"
                  id="profile-image-input"
                  onChange={handleImageSelection}
                  data-testid="test-profile-image-input"
                ></input>
                <div
                  className="absolute grid w-full h-full top-0 left-0 right-0 bottom-0 bg-black text-white 
                        opacity-0 hover:opacity-60 place-items-center cursor-pointer"
                  onClick={handleChooseProfileButtonClick}
                >
                  <span>Change Image</span>
                </div>
              </div>
              <span className="font-roboto text-xl md:text-2xl font-light my-2">
                {name}
              </span>
              <form className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center my-2">
                  <button
                    className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                    onClick={handleUseDefaultButtonClick}
                  >
                    Use Default Image
                  </button>
                </div>
                <div className="w-full flex flex-col justify-center">
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
                </div>

                {showChangeEmailOrPassword && (
                  <div className="flex items-center justify-center my-4">
                    <button
                      className="border border-gray-300 rounded-md py-1 px-2 mr-1 text-sm font-semibold md:hover:bg-gray-300 md:hover:shadow-inner"
                      onClick={() => setSection("email")}
                    >
                      Change Email
                    </button>
                    <button
                      className="border border-gray-300 rounded-md py-1 px-2 ml-1  text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                      onClick={() => setSection("password")}
                    >
                      Change Password
                    </button>
                  </div>
                )}
                {!showChangeEmailOrPassword && (
                  <span className="text-gray-400 text-xs text-center mt-2">
                    Because you have signed in with an external provider, you
                    don't have the ability to change your email or password.
                  </span>
                )}
                <div className="flex items-center justify-center">
                  <div
                    className="m-2"
                    onClick={(e) => handleNameOrImageChange(e)}
                  >
                    <Button>Save</Button>
                    <input type="submit" className="hidden" id="submit-form" />
                  </div>
                  <div className="m-2" onClick={exit}>
                    <ButtonSecondary>Return</ButtonSecondary>
                  </div>
                </div>
              </form>
            </div>
          )}
          {section === "email" && (
            <form
              id="email-form"
              className="w-full flex flex-col justify-center"
            >
              <div className="flex w-full items-center my-2">
                <div className="w-full h-px bg-gray-400"></div>
                <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
                  {" "}
                  Change Email{" "}
                </span>
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                required
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formCurrentPassword}
                onChange={(e) => setFormCurrentPassword(e.target.value)}
              />
              <div className="flex w-full items-center mt-4 mb-2">
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-2" onClick={(e) => handleEmailChange(e)}>
                  <Button>Save</Button>
                  <input type="submit" className="hidden" id="submit-form" />
                </div>
                <div className="m-2" onClick={() => cancelEmailChange()}>
                  <ButtonSecondary>Cancel</ButtonSecondary>
                </div>
              </div>
            </form>
          )}
          {section === "password" && (
            <form>
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
                required
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formCurrentPassword}
                onChange={(e) => setFormCurrentPassword(e.target.value)}
              />
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                required
                className="border rounded-md border-gray-300 w-full p-1 my-1"
                value={formNewPassword}
                onChange={(e) => setFormNewPassword(e.target.value)}
              />
              <div className="flex w-full items-center mt-4 mb-2">
                <div className="w-full h-px bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-2" onClick={(e) => handlePasswordChange(e)}>
                  <Button>Save</Button>
                  <input type="submit" className="hidden" id="submit-form" />
                </div>
                <div className="m-2" onClick={(e) => cancelPasswordChange(e)}>
                  <ButtonSecondary>Cancel</ButtonSecondary>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default EditProfile;
