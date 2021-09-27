# QuickSnap

## Overview

👉 [Check out QuickSnap here](https://quicksnap-58e9a.web.app) 👈

QuickSnap is a media-sharing platform based on Instagram, which allows users to share photos, send messages, and like, comment, and save posts. I created QuickSnap for my final project in the Odin Project web development course.

## Project features

- A user authentication system using firebase. Users can create their own account with an email address, or use their existing Google account. Other sign in methods (Facebook, Apple, Github) will be added in a future update.

  <img  src="https://github.com/Atlas-1510/quicksnap/blob/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/login.png?raw=true"  width="500px"  />

- A homepage feed with updated content from followed users. If the user doesn't follow any accounts yet, the feed is populated with recent posts by any user. Users are shown suggested accounts to follow, based on which accounts are receiving the most user interest.

  <img  src="https://raw.githubusercontent.com/Atlas-1510/quicksnap/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/home.png"  width="500px"  />

- A profile page for each user, which shows their posts, as well as posts from other users that they have liked or saved.

  <img src="https://github.com/Atlas-1510/quicksnap/blob/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/profile.png?raw=true" width="500px"/>

- A messenger system, which enables users to send private communication to one another.

  <img src="https://github.com/Atlas-1510/quicksnap/blob/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/messenger.png?raw=true" width="500px"/>

- A search system based on Algolia, which enables users to find one another. The search modal also keeps track of past searches, to make reconnection easier.

  <img src="https://github.com/Atlas-1510/quicksnap/blob/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/search.png?raw=true" width="500px"/>

- Users can customise their accounts, by changing their profile photos and usernames. For users that don't choose their own profile, one is automatically provided based on their initials.

  <img src="https://github.com/Atlas-1510/quicksnap/blob/5f1bb6cd2e4f8f1e4689c5367423c48f36b776be/readme-images/editProfile.png?raw=true" width="500px"/>

## Other notes

- This project is fully responsive, and is designed to look great on any screen size.
- A custom image compression system has been implemented, to reduce file sizes when users try to upload very large image files.
- Cloud functions via firebase are used to keep app information in sync, as well as to clean up posts, comments, and other documents if a user deletes their account.
- This project was built using test-driven development.

## Tools used

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com) (authentication, firestore, cloud functions, storage, and hosting)
- [Tailwind CSS](https://tailwindcss.com)
- [Algolia Search](https://www.algolia.com)
- [Jest](https://jestjs.io)

## Special thanks to...

The following real-life instagram accounts, which I copied to create demo accounts in this project

- [mkbhd](https://www.instagram.com/mkbhd/)
- [jackhoward](https://www.instagram.com/jackhoward/)
- [hazelhayes](https://www.instagram.com/thehazelhayes/)
- [flume](https://www.instagram.com/flume/)
- [doddleoddle](https://www.instagram.com/doddleoddle/)
