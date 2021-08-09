export default function getMessages(userID) {
  if (userID === null) {
    return null;
  } else {
    return [
      {
        id: 1,
        content: "message content 1",
      },
      {
        id: 2,
        content: "message content 2",
      },
      {
        id: 3,
        content: "message content 3",
      },
    ];
  }
}
