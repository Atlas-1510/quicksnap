import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Main";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";

import { auth } from "../../../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";

import generateProfileImage from "../../../utils/generateProfileImage/generateProfileImage";
import postToStorage from "../../../firebase/postToStorage";
import postToFirestore from "../../../firebase/postToFirestore";

function EditProfile({ exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, () => exit());
  const [section, setSection] = useState("nameAndImage");

  return (
    <div ref={ref} className="w-full h-full md:w-1/3 md:h-auto ">
      {isComponentVisible && (
        <div
          className="bg-white border rounded-md border-gray-300 w-full h-full p-4 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {section === "nameAndImage" && (
            <ChangeNameOrImage setSection={setSection} exit={exit} />
          )}
          {section === "email" && <ChangeEmail setSection={setSection} />}
          {section === "password" && <ChangePassword setSection={setSection} />}
          {section === "deleteAccount" && (
            <DeleteAccount setSection={setSection} />
          )}
        </div>
      )}
    </div>
  );
}

export default EditProfile;

function ChangeNameOrImage({ exit, setSection }) {
  const [showChangeEmailOrPassword, setShowChangeEmailOrPassword] =
    useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user.providerData[0].providerId !== "password") {
      setShowChangeEmailOrPassword(false);
    }
  }, []);

  const { profileImage, name, fullName, uid, customProfileImage } =
    useContext(UserContext);
  const [newProfileImage, setNewProfileImage] = useState({
    source: profileImage,
    type: "original",
  });
  const [customProfileFlag, setCustomProfileFlag] =
    useState(customProfileImage);
  const [profilePreview, setProfilePreview] = useState(profileImage);
  const [formFullName, setFormFullName] = useState(fullName);
  const [formUserName, setFormUserName] = useState(name);
  const [resultPrompt, setResultPrompt] = useState({
    text: " ",
    color: "green",
  });

  const handleChooseProfileButtonClick = (e) => {
    e.preventDefault();
    e.target.blur();
    document.querySelector("#profile-image-input").click();
  };

  const handleUseDefaultButtonClick = (e) => {
    e.preventDefault();
    if (formFullName.match(/\w+\s\w+/)) {
      const initialsImage = generateProfileImage(fullName);
      setNewProfileImage({
        source: initialsImage,
        type: "default",
      });
      setCustomProfileFlag(false);
      setProfilePreview(initialsImage);
    } else {
      setResultPrompt({
        text: "To use a default profile image, your full name input must be two words.",
        color: "red",
      });
    }
  };

  const handleImageSelection = () => {
    const chosenImage = document.querySelector("#profile-image-input").files[0];
    if (chosenImage) {
      setNewProfileImage({
        source: chosenImage,
        type: "custom",
      });
      setProfilePreview(URL.createObjectURL(chosenImage));
      setCustomProfileFlag(true);
    }
  };

  const handleNameOrImageChange = async (e) => {
    e.preventDefault();
    setResultPrompt(null);
    // use newProfileImage state to update user document, not the value from the image input.
    try {
      let changeMade = false;
      const newUserDoc = {};
      if (formFullName !== fullName) {
        newUserDoc.fullName = formFullName;
        changeMade = true;
      }
      if (formUserName !== name) {
        newUserDoc.name = formUserName;
        changeMade = true;
      }
      if (newProfileImage.source !== profileImage) {
        changeMade = true;
        let profileURL;
        switch (newProfileImage.type) {
          case "original":
            profileURL = null;
            break;
          case "default":
            profileURL = newProfileImage.source;
            break;
          case "custom":
            profileURL = await postToStorage(
              newProfileImage.source,
              `${uid}/profileImages/`
            );
            break;
          default:
            throw new Error("Something went wrong with saving profile image.");
        }
        newUserDoc.profileImage = profileURL;
        newUserDoc.customProfileImage = customProfileFlag;
        // TODO: add image compression to new profile image if file is too big
      }
      if (changeMade) {
        postToFirestore(newUserDoc, `/users/${uid}`, true);
        confirmChange();
      } else {
        warnChangeFailure("No changes have been made!");
      }
    } catch {
      warnChangeFailure();
    }
  };

  const confirmChange = () => {
    setResultPrompt({
      text: "Your changes have been saved.",
      color: "green",
    });
  };

  const warnChangeFailure = (input) => {
    setResultPrompt({
      text: input ? input : "Something went wrong.",
      color: "red",
    });
  };

  const loadSection = (section) => {
    setResultPrompt(null);
    setSection(section);
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="relative h-20 w-20 md:h-36 md:w-36 border rounded-full overflow-hidden my-2">
        <img src={profilePreview} alt="chosen display for current user" />
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
              onClick={() => loadSection("email")}
            >
              Change Email
            </button>
            <button
              className="border border-gray-300 rounded-md py-1 px-2 ml-1  text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
              onClick={() => loadSection("password")}
            >
              Change Password
            </button>
            <button
              className="border border-gray-300 rounded-md py-1 px-2 ml-1  text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
              onClick={() => loadSection("deleteAccount")}
            >
              Delete Account
            </button>
          </div>
        )}
        {resultPrompt && (
          <div>
            <span
              className="text-xs text-center mt-2"
              style={{ color: resultPrompt.color }}
            >
              {resultPrompt.text}
            </span>
          </div>
        )}
        {!showChangeEmailOrPassword && (
          <span className="text-gray-400 text-xs text-center mt-2">
            Because you have signed in with an external provider, you don't have
            the ability to change your email or password.
          </span>
        )}
        <div className="flex items-center justify-center">
          <div className="m-2" onClick={(e) => handleNameOrImageChange(e)}>
            <Button>Save</Button>
            <input type="submit" className="hidden" id="submit-form" />
          </div>
          <div className="m-2" onClick={exit}>
            <ButtonSecondary>Return</ButtonSecondary>
          </div>
        </div>
      </form>
    </div>
  );
}

function ChangeEmail({ setSection }) {
  const [formEmail, setFormEmail] = useState(auth.currentUser.email);
  const [formCurrentPassword, setFormCurrentPassword] = useState("");
  const [resultPrompt, setResultPrompt] = useState({
    text: "",
    color: "green",
  });

  const confirmChange = () => {
    setResultPrompt({
      text: "Your changes have been saved.",
      color: "green",
    });
  };

  const warnChangeFailure = (input) => {
    setResultPrompt({
      text: input ? input : "Something went wrong.",
      color: "red",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formCurrentPassword && formEmail) {
      handleEmailChange();
    } else {
      warnChangeFailure("Please enter a new email and your password.");
    }
  };

  const handleEmailChange = async () => {
    setResultPrompt(null);
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      formCurrentPassword
    );
    try {
      await auth.currentUser.reauthenticateWithCredential(cred);
      await auth.currentUser.updateEmail(formEmail);
      confirmChange();
    } catch (err) {
      warnChangeFailure(err.message);
    }
  };

  const cancelEmailChange = () => {
    setResultPrompt(null);
    setFormEmail(auth.currentUser.email);
    setFormCurrentPassword("");
    setSection("nameAndImage");
  };
  return (
    <form id="email-form" className="w-full flex flex-col justify-center">
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
      {resultPrompt && (
        <span
          className="text-xs text-center mt-2"
          style={{ color: resultPrompt.color }}
        >
          {resultPrompt.text}
        </span>
      )}
      <div className="flex items-center justify-center">
        <div className="m-2" onClick={(e) => handleSubmit(e)}>
          <Button>Save</Button>
        </div>
        <div className="m-2" onClick={() => cancelEmailChange()}>
          <ButtonSecondary>Return</ButtonSecondary>
        </div>
      </div>
    </form>
  );
}

function ChangePassword({ setSection }) {
  const [formNewPassword, setFormNewPassword] = useState("");
  const [formCurrentPassword, setFormCurrentPassword] = useState("");
  const [resultPrompt, setResultPrompt] = useState({
    text: "",
    color: "green",
  });

  const confirmChange = () => {
    setResultPrompt({
      text: "Your changes have been saved.",
      color: "green",
    });
  };

  const warnChangeFailure = (input) => {
    setResultPrompt({
      text: input ? input : "Something went wrong.",
      color: "red",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formCurrentPassword && formNewPassword) {
      handlePasswordChange();
    } else {
      warnChangeFailure(
        "Please enter a new password and your current password."
      );
    }
  };

  const handlePasswordChange = async () => {
    setResultPrompt(null);
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      formCurrentPassword
    );
    try {
      await auth.currentUser.reauthenticateWithCredential(cred);
      await auth.currentUser.updatePassword(formNewPassword);
      confirmChange();
    } catch (err) {
      warnChangeFailure(err.message);
    }
  };

  const cancelPasswordChange = () => {
    setResultPrompt(null);
    setFormCurrentPassword("");
    setFormNewPassword("");
    setSection("nameAndImage");
  };

  return (
    <form className="flex flex-col justify-center w-full">
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
      {resultPrompt && (
        <span
          className="text-xs text-center mt-2"
          style={{ color: resultPrompt.color }}
        >
          {resultPrompt.text}
        </span>
      )}
      <div className="flex items-center justify-center">
        <div className="m-2" onClick={(e) => handleSubmit(e)}>
          <Button>Save</Button>
        </div>
        <div className="m-2" onClick={(e) => cancelPasswordChange(e)}>
          <ButtonSecondary>Return</ButtonSecondary>
        </div>
      </div>
    </form>
  );
}

function DeleteAccount({ setSection }) {
  const [formPassword, setFormPassword] = useState("");
  const [resultPrompt, setResultPrompt] = useState({
    text: "",
    color: "green",
  });

  const confirmChange = () => {
    setResultPrompt({
      text: "Your changes have been saved.",
      color: "green",
    });
  };

  const warnChangeFailure = (input) => {
    setResultPrompt({
      text: input ? input : "Something went wrong.",
      color: "red",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formPassword) {
      handleDeleteAccount();
    } else {
      warnChangeFailure(
        "Please enter your current password to confirm this change."
      );
    }
  };

  const handleDeleteAccount = async () => {
    setResultPrompt(null);
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      formPassword
    );
    try {
      await auth.currentUser.reauthenticateWithCredential(cred);
      await auth.currentUser.delete();
      await auth.signOut();
      confirmChange();
      document.location.href = "/";
    } catch (err) {
      warnChangeFailure(err.message);
    }
  };

  const cancelDeleteAccount = () => {
    setResultPrompt(null);
    setFormPassword("");
    setSection("nameAndImage");
  };

  return (
    <form className="flex flex-col justify-center w-full">
      <div className="flex w-full items-center my-2">
        <div className="w-full h-px bg-gray-400"></div>
        <span className="whitespace-nowrap mx-4 text-gray-400 font-semibold">
          {" "}
          Delete Account{" "}
        </span>
        <div className="w-full h-px bg-gray-400"></div>
      </div>

      <label htmlFor="currentPassword">Enter Your Password</label>
      <input
        type="password"
        name="currentPassword"
        required
        className="border rounded-md border-gray-300 w-full p-1 my-1"
        value={formPassword}
        onChange={(e) => setFormPassword(e.target.value)}
      />
      <div className="flex w-full items-center mt-4 mb-2">
        <div className="w-full h-px bg-gray-400"></div>
      </div>
      {resultPrompt && (
        <span
          className="text-xs text-center mt-2"
          style={{ color: resultPrompt.color }}
        >
          {resultPrompt.text}
        </span>
      )}
      <div className="flex items-center justify-center">
        <div className="m-2" onClick={(e) => handleSubmit(e)}>
          <Button>Save</Button>
        </div>
        <div className="m-2" onClick={(e) => cancelDeleteAccount(e)}>
          <ButtonSecondary>Return</ButtonSecondary>
        </div>
      </div>
    </form>
  );
}
