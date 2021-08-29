import getInitials from "./getInitials/getInitials";

export default function generateProfileImage(fullName) {
  const initials = getInitials(fullName);

  const diceBearURL = `https://avatars.dicebear.com/api/initials/${initials}.svg`;

  return diceBearURL;
}
