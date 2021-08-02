import { useEffect } from "react";
import "./App.css";

// import BGimage20 from "./images/BGimage20.jpg";
// import BGimage21 from "./images/BGimage21.jpg";
// import BGimage23 from "./images/BGimage23.jpg";
// import BGimage33 from "./images/BGimage33.jpg";
// import BGimage11 from "./images/BGimage11.jpg";
// import BGimage14 from "./images/BGimage14.jpg";
// import BGimage4 from "./images/BGimage4.jpg";
// import BGimage18 from "./images/BGimage18.jpg";

import BGimage1 from "./images/BGimage1.jpg";
import BGimage2 from "./images/BGimage2.jpg";
import BGimage3 from "./images/BGimage3.jpg";
import BGimage4 from "./images/BGimage4.jpg";
import BGimage5 from "./images/BGimage5.jpg";
import BGimage6 from "./images/BGimage6.jpg";
import BGimage7 from "./images/BGimage7.jpg";
import BGimage8 from "./images/BGimage8.jpg";
// import BGimage9 from "./images/BGimage9.jpg";
// import BGimage10 from "./images/BGimage10.jpg";
// import BGimage11 from "./images/BGimage11.jpg";
// import BGimage12 from "./images/BGimage12.jpg";
// import BGimage13 from "./images/BGimage13.jpg";
// import BGimage14 from "./images/BGimage14.jpg";
// import BGimage15 from "./images/BGimage15.jpg";
// import BGimage16 from "./images/BGimage16.jpg";
// import BGimage17 from "./images/BGimage17.jpg";
// import BGimage18 from "./images/BGimage18.jpg";

const images = [
  // BGimage20,
  // BGimage21,
  // BGimage23,
  // BGimage33,
  // BGimage11,
  // BGimage14,
  // BGimage4,
  // BGimage18,
  BGimage1,
  BGimage2,
  BGimage3,
  BGimage4,
  BGimage5,
  BGimage6,
  BGimage7,
  BGimage8,
  // BGimage9,
  // BGimage10,
  // BGimage11,
  // BGimage12,
  // BGimage13,
  // BGimage14,
  // BGimage15,
  // BGimage16,
  // BGimage17,
  // BGimage18,
];

function App() {
  useEffect(() => {
    const imageStack = document.getElementById("imageStack");
    console.log(imageStack.scrollWidth);
  });

  const getWidth = () => {
    const sliderLine = document.getElementById("sliderLine");
    console.log(sliderLine.scrollWidth);
  };
  return (
    <div className="grid grid-rows-4 h-full overflow-hidden">
      <div
        id="sliderLine"
        className="slider-line flex h-full"
        onClick={getWidth}
      >
        <div id="imageStack" className="image-stack flex my-1 relative h-full">
          {images.map((image, index) => (
            <img
              key={index}
              className="mx-1 h-full border-0 rounded-lg"
              src={image}
              alt="decorative tile as part of background mosaic"
            />
          ))}
        </div>
        <div id="imageStack" className="image-stack flex my-1 relative h-full">
          {images.map((image, index) => (
            <img
              key={index}
              className="mx-1 h-full border-0 rounded-lg"
              src={image}
              alt="decorative tile as part of background mosaic"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// {
//   images.map((image, index) => (
//     <img
//       key={index}
//       className="h-full mx-1"
//       src={image}
//       alt="decorative tile as part of background mosaic"
//     />
//   ));
// }

// grid grid-rows-4 max-h-screen max-w-none

//  <img
//                     key={index}
//                     className="mx-1 max-h-full w-auto ml-1"
//                     src={image}
//                     alt="decorative tile as part of background mosaic"
//                   />
