import React from "react";
import { motion } from "framer-motion";

function ButtonSecondary({ children }) {
  return (
    <motion.button
      className="bg-gray-400 my-3 py-1 px-2 border-0 rounded-sm text-white hover:shadow-inner hover:bg-gray-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
}

export default ButtonSecondary;
