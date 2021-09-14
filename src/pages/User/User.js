import React, { useContext, useState } from "react";
import { UserContext } from "../Main";
import useGetUserPosts from "../../hooks/useGetUserPosts/useGetUserPosts";
import getPostInfo from "../../utils/getPostInfo/getPostInfo";
import ImageModal from "../../components/ImageModal/ImageModal";
import { Link } from "react-router-dom";
import ModalBackground from "../../components/ModalBackground";
import EditProfile from "./EditProfile/EditProfile";
import handleLogOut from "../../utils/handleLogOut/handleLogOut";
import Footer from "../../components/Footer";
import useGetLikedPosts from "../../hooks/useGetLikedPosts/useGetLikedPosts";

function User() {
  const {
    uid,
    name,
    fullName,
    profileImage,
    postCount,
    followerCount,
    followingCount,
  } = useContext(UserContext);

  const userPosts = useGetUserPosts(uid);
  const likedPosts = useGetLikedPosts(uid);
  const [grid, setGrid] = useState("posts");
  const [activePost, setActivePost] = useState(null);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const switchGrid = (type) => {
    switch (type) {
      case "posts":
        setGrid("posts");
        break;
      case "liked":
        setGrid("liked");
        break;
      default:
        throw new Error(
          `switchGrid not assigned a valid setting. Received: ${type} `
        );
    }
  };

  const openPost = async (id) => {
    let info = await getPostInfo(id);
    setActivePost(info);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Top Section */}
        <div className="grid grid-cols-3 grid-rows-1 my-6 justify-items-center items-center">
          {/* Profile Image */}
          <div className=" h-20 w-20 md:h-36 md:w-36 border rounded-full overflow-hidden col-start-1 col-span-1">
            <img src={profileImage} alt="chosen display for current user" />
          </div>
          {/* User Information */}
          <div className="col-start-2 col-span-2">
            {/* Container for user name, edit profile and log out buttons */}
            <div className="flex items-center">
              <span className="font-roboto text-xl md:text-3xl font-light mr-2 md:mr-6">
                {name}
              </span>
              <button
                className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                onClick={() => setEditProfileModal(true)}
              >
                Edit Profile
              </button>
              <button
                className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                onClick={() => handleLogOut()}
              >
                Log Out
              </button>
              <Link to="/" id="returnHome" />
            </div>
            {/* Container for full name of user */}
            <div>
              <span className="text-gray-500">{fullName}</span>
            </div>
            {/* Container for counts of posts, followers, and following */}
            <div className="mt-6 text-xs md:text-sm">
              <span className="mr-4" data-testid="test-posts">
                <span className="font-semibold">{postCount}</span> posts
              </span>
              <span className="mr-4" data-testid="test-followers">
                <span className="font-semibold">{followerCount}</span> followers
              </span>
              <span className="mr-4" data-testid="test-following">
                <span className="font-semibold">{followingCount}</span>{" "}
                following
              </span>
            </div>
          </div>
        </div>
        {/* Subsection selector */}
        <div className="border-t border-gray-300 grid place-items-center">
          <div className=" flex justify-between items-center w-1/3 font-roboto text-sm">
            <div
              className={`p-3 cursor-pointer ${
                grid === "posts"
                  ? "text-black border-t border-black relative -top-px"
                  : "text-gray-400"
              }`}
              onClick={() => switchGrid("posts")}
              data-testid="test-show-posts-button"
            >
              <span>POSTS</span>
            </div>
            <div
              className={`p-3 cursor-pointer ${
                grid === "liked"
                  ? "text-black border-t border-black relative -top-px"
                  : "text-gray-400"
              }`}
              onClick={() => switchGrid("liked")}
              data-testid="test-show-liked-button"
            >
              <span>LIKED</span>
            </div>
          </div>
        </div>
        {/* Image Grid Container */}
        <div className="flex-grow">
          {/* Image Grid */}

          {grid === "posts" && userPosts && (
            <ImageGrid posts={userPosts} openPost={openPost} />
          )}
          {grid === "liked" && likedPosts && (
            <ImageGrid posts={likedPosts} openPost={openPost} />
          )}
          {/* TODO: Add saved section to go with posts and likes. Tie to bookmark button in card component */}
        </div>
        {/* Image Modal (shows when a post is opened) */}
        {activePost && (
          <ImageModal post={activePost} setActivePost={setActivePost} />
        )}
        <Footer />
      </div>
      {editProfileModal && (
        <ModalBackground exit={() => setEditProfileModal(false)}>
          <EditProfile exit={() => setEditProfileModal(false)} />
        </ModalBackground>
      )}
    </>
  );
}

export default User;

function ImageGrid({ posts, openPost }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-6 auto-rows-auto">
      {posts.map((post) => {
        return (
          <div
            className="inline-block relative overflow-hidden"
            key={post.id}
            data-testid={post.id}
            onClick={() => openPost(post.id)}
          >
            <div style={{ marginTop: "100%" }}></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full cursor-pointer">
              <img
                src={post.image}
                className="w-full h-full object-cover"
                alt="one of the current user posts"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
