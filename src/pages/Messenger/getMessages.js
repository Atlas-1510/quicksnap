export default function getMessages(userID) {
  if (userID === null) {
    return null;
  } else {
    return [
      {
        id: 1,
        authorID: 1,
        content: "user message 1",
      },
      {
        id: 2,
        authorID: 2,
        content: "respondant message 1",
      },
      {
        id: 3,
        authorID: 1,
        content: "user message 2",
      },
      {
        id: 4,
        authorID: 1,
        content:
          "A really really really really really really really really really really really really really really really long message",
      },
      {
        id: 5,
        authorID: 2,
        content:
          "Another really  really really really really really really really really long message",
      },
    ];
  }
}
