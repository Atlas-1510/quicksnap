import React from "react";
import { motion } from "framer-motion";

function ModalBackground({ children, onClick }) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-screen h-screen z-50 flex items-center justify-center"
      style={{ background: "#00000080" }}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default ModalBackground;
