import React, { useState, useContext, useEffect } from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts/useGetUserPosts";
import getPostInfo from "../../utils/getPostInfo/getPostInfo";
import ImageModal from "../../components/ImageModal/ImageModal";

import useGetUserInfo from "../../hooks/useGetUserInfo/useGetUserInfo";
import { useParams } from "react-router";
import { UserContext } from "../Main";
import followUser from "../../utils/followUser/followUser";
import unfollowUser from "../../utils/unfollowUser/unfollowUser";
import { Redirect } from "react-router";

function ViewAnotherUser() {
  const { id } = useParams();
  const { following, uid } = useContext(UserContext);
  const userInfo = useGetUserInfo(id);
  const userPosts = useGetUserPosts(id);
  const [activePost, setActivePost] = useState(null);
  const [follows, setFollows] = useState(false);
  const openPost = async (id) => {
    let info = await getPostInfo(id);
    setActivePost(info);
  };

  useEffect(() => {
    if (following.includes(id)) {
      setFollows(true);
    } else {
      setFollows(false);
    }
  }, [following, id]);

  const handleFollowUser = async () => {
    await followUser(uid, id);
  };

  const handleUnfollowUser = async () => {
    await unfollowUser(uid, id);
  };

  if (uid === id) {
    return <Redirect to="/user" />;
  }

  return (
    <>
      {userInfo && (
        <div className="flex flex-col h-full">
          {/* Top Section */}
          <div className="grid grid-cols-3 grid-rows-1 my-6 justify-items-center items-center">
            {/* Profile Image */}
            <div className=" h-20 w-20 md:h-36 md:w-36 border rounded-full overflow-hidden col-start-1 col-span-1">
              <img
                src={userInfo.profileImage}
                alt="chosen display for current user"
              />
            </div>
            {/* User Information */}
            <div className="col-start-2 col-span-2">
              {/* Container for user name, edit profile and log out buttons */}
              <div className="flex items-center justify-between">
                <span className="font-roboto text-xl md:text-3xl font-light mr-2 md:mr-6">
                  {userInfo.name}
                </span>
                {follows && (
                  <button
                    className="border border-gray-300 rounded-md py-1 px-2 m-1 mr-3 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                    onClick={() => handleUnfollowUser()}
                  >
                    Stop Following
                  </button>
                )}
                {!follows && (
                  <button
                    className="border border-gray-300 rounded-md py-1 px-2 m-1 mr-3 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
                    onClick={() => handleFollowUser()}
                  >
                    Follow
                  </button>
                )}
              </div>
              {/* Container for full name of user */}
              <div>
                <span className="text-gray-500">{userInfo.fullName}</span>
              </div>
              {/* Container for counts of posts, followers, and following */}
              <div className="mt-6 text-xs md:text-sm">
                <span className="mr-4" data-testid="test-posts">
                  <span className="font-semibold">{userInfo.postCount}</span>{" "}
                  posts
                </span>
                <span className="mr-4" data-testid="test-followers">
                  <span className="font-semibold">
                    {userInfo.followerCount}
                  </span>{" "}
                  followers
                </span>
                <span className="mr-4" data-testid="test-following">
                  <span className="font-semibold">
                    {userInfo.followingCount}
                  </span>{" "}
                  following
                </span>
              </div>
            </div>
          </div>
          {/* Subsection selector */}
          <div className="border-t border-gray-300 grid place-items-center">
            <div className=" flex justify-center items-center w-1/3 font-roboto text-sm">
              <div
                className={
                  "p-3 cursor-pointer text-black border-t border-black relative -top-px"
                }
                data-testid="test-show-posts-button"
              >
                <span>POSTS</span>
              </div>
            </div>
          </div>
          {/* Image Grid Container */}
          <div className="flex-grow">
            {userPosts && <ImageGrid posts={userPosts} openPost={openPost} />}
          </div>
          {/* Image Modal (shows when a post is opened) */}
          {activePost && (
            <ImageModal post={activePost} setActivePost={setActivePost} />
          )}
          {/* TODO: Implement Footer */}
          <footer>FOOTER</footer>
        </div>
      )}
    </>
  );
}

export default ViewAnotherUser;

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
