// source: https://stackoverflow.com/questions/54560790/detect-click-outside-react-component-using-hooks
//
// Extended to take an optional callback, which will fire when the component is closed

import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible, onClose) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideComponent = (e) => {
    if (e.key === "Escape") {
      setIsComponentVisible(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideComponent, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideComponent, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
