import useComponentVisible from "../../hooks/useComponentVisible/useComponentVisible";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../pages/Main";
import ChevronLeft from "../../images/SVG/ChevronLeft";
import followUser from "../../utils/followUser/followUser";
import unfollowUser from "../../utils/unfollowUser/unfollowUser";
import Button from "../Button";

export default function LikedByModal({ width, likedByInfo, exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, exit);
  const { following } = useContext(UserContext);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full grid place-items-center bg-black bg-opacity-50 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={ref}
        className={
          width > 768
            ? "w-1/3 bg-white border rounded-md z-50"
            : "bg-white absolute top-0 w-full h-full z-50"
        }
      >
        {isComponentVisible && (
          <div className={width > 768 ? "" : "flex flex-col text-sm"}>
            <div className="flex flex-col text-sm">
              <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
                <div className=" absolute left-0 w-7" onClick={(e) => exit(e)}>
                  <ChevronLeft />
                </div>
                <span className="font-semibold m-1">Likes</span>
              </div>
              {likedByInfo &&
                likedByInfo.map((user) => (
                  <LikedByUser user={user} following={following} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LikedByUser({ user, following }) {
  const [isFollowing, setIsFollowing] = useState(null);
  const { uid } = useContext(UserContext);
  useEffect(() => {
    if (user.id === uid) {
      setIsFollowing("current_user");
    } else if (following.includes(user.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, []);

  const handleFollowUser = async (e) => {
    e.preventDefault();
    await followUser(uid, user.id);
    setIsFollowing(true);
  };

  const handleUnfollowUser = async (e) => {
    e.preventDefault();
    await unfollowUser(uid, user.id);
    setIsFollowing(false);
  };

  return (
    <div className="flex m-2 items-center" key={user.id}>
      <img
        alt="User"
        src={user.profileImage}
        className="h-10 w-10 border rounded-full"
      />
      <div className="flex flex-col flex-grow ml-3">
        <span className="font-semibold">{user.name}</span>
        <span className="text-gray-500">{user.fullName}</span>
      </div>
      {isFollowing && isFollowing !== "current_user" && (
        <button
          onClick={(e) => handleUnfollowUser(e)}
          className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
        >
          Following
        </button>
      )}
      {!isFollowing && (
        <div className="mx-1" onClick={handleFollowUser}>
          <Button>Follow</Button>
        </div>
      )}
    </div>
  );
}
