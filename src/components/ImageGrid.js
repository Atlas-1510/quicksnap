import React from "react";
import { motion } from "framer-motion";

export default function ImageGrid({ posts, openPost }) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-1 md:gap-6 auto-rows-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
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
    </motion.div>
  );
}
