import { auth } from "../../firebase/firebase";

const handleLogOut = () => {
  document.location.href = "/";
  auth.signOut();
};

export default handleLogOut;
