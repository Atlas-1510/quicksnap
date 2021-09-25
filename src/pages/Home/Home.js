import React, { useContext, useState } from "react";
import Card from "../../components/Card";
import RightSideBox from "../../components/RightSideBox";
import { UserContext, FeedContext } from "../Main";
import Camera from "../../images/SVG/Camera";
import useGetFollowSuggestions from "../../hooks/useGetFollowSuggestions/useGetFollowSuggestions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

// TODO: Add pull down to refresh

function Home({ setCurrentPage }) {
  const user = useContext(UserContext);
  const { feed, fetchMorePosts } = useContext(FeedContext);
  const followSuggestions = useGetFollowSuggestions(user);
  const [fetchPosts, setFetchPosts] = useState("");

  const getMorePosts = async () => {
    setFetchPosts("loading");
    const response = await fetchMorePosts();
    if (response === "success") {
      setFetchPosts("");
    } else if (response === "failure") {
      setFetchPosts("failure");
    } else if (response === "no-more-posts") {
      setFetchPosts("no-more-posts");
    }
  };
  return (
    <div className="flex flex-col">
      {/* Mobile Header */}
      <nav className="relative flex md:hidden justify-center items-center w-full bg-white border-b border-gray-300 py-1">
        <div className="w-7 m-2 absolute left-0">
          <Camera />
        </div>
        <h1 className="font-curly text-4xl m-1">QuickSnap</h1>
      </nav>
      <RightSideBox
        user={user}
        followSuggestions={followSuggestions}
        setCurrentPage={setCurrentPage}
      />
      <div className="w-full lg:w-3/5 mt-2 md:mt-auto  flex flex-col justify-center items-center">
        {feed &&
          feed.map((card) => (
            <Card key={card.id} card={card} setCurrentPage={setCurrentPage} />
          ))}
        {fetchPosts === "" && (
          <button className="py-8" onClick={() => getMorePosts()}>
            Load More
          </button>
        )}
        {fetchPosts === "loading" && (
          <div className="flex justify-center items-center py-5 ">
            <Loader
              type="BallTriangle"
              color="#D1D5DB"
              height={50}
              width={50}
              timeout={3000}
            />
          </div>
        )}
        {fetchPosts === "failure" && (
          <span className="text-gray-500">
            Sorry, something has gone wrong!
          </span>
        )}
        {fetchPosts === "no-more-posts" && (
          <span className="text-gray-500 py-8"> ~ End of your feed ~</span>
        )}
      </div>
    </div>
  );
}

export default Home;
