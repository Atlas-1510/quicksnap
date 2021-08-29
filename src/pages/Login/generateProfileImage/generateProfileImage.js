export default function generateProfileImage(fullName) {
  const words = fullName.split(" ");
  let initials;
  if (words.length === 2) {
    const firstInitial = words[0].substring(0, 1).toUpperCase();
    const lastWord = words[words.length - 1];
    const lastInitial = lastWord.substring(0, 1).toUpperCase();
    initials = `${firstInitial}${lastInitial}`;
  } else {
    throw new Error(
      "generateProfileImage recieved a fullName input that is not two words long"
    );
  }
  return initials;
}
