import React from "react";
import { motion } from "framer-motion";

function Button({ children }) {
  return (
    <motion.button
      className="bg-blue-500 my-3 py-1 px-2 border-0 rounded-sm text-white hover:shadow-inner hover:bg-blue-400"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
}

export default Button;
