import React from "react";
import "./ImageBanner.css";

import BGimage1 from "../../images/image-slider/BGimage1.jpg";
import BGimage2 from "../../images/image-slider/BGimage2.jpg";
import BGimage3 from "../../images/image-slider/BGimage3.jpg";
import BGimage4 from "../../images/image-slider/BGimage4.jpg";
import BGimage5 from "../../images/image-slider/BGimage5.jpg";
import BGimage6 from "../../images/image-slider/BGimage6.jpg";
import BGimage7 from "../../images/image-slider/BGimage7.jpg";
import BGimage8 from "../../images/image-slider/BGimage8.jpg";
import BGimage9 from "../../images/image-slider/BGimage9.jpg";
import BGimage10 from "../../images/image-slider/BGimage10.jpg";
import BGimage11 from "../../images/image-slider/BGimage11.jpg";
import BGimage12 from "../../images/image-slider/BGimage12.jpg";
import BGimage13 from "../../images/image-slider/BGimage13.jpg";
import BGimage14 from "../../images/image-slider/BGimage14.jpg";
import BGimage15 from "../../images/image-slider/BGimage15.jpg";
import BGimage16 from "../../images/image-slider/BGimage16.jpg";
import BGimage17 from "../../images/image-slider/BGimage17.jpg";
import BGimage18 from "../../images/image-slider/BGimage18.jpg";
import BGimage19 from "../../images/image-slider/BGimage19.jpg";
import BGimage20 from "../../images/image-slider/BGimage20.png"; // png
import BGimage22 from "../../images/image-slider/BGimage22.jpg";
import BGimage21 from "../../images/image-slider/BGimage21.jpg";
import BGimage23 from "../../images/image-slider/BGimage23.jpg";
import BGimage24 from "../../images/image-slider/BGimage24.jpg";
import BGimage25 from "../../images/image-slider/BGimage25.jpg";
import BGimage26 from "../../images/image-slider/BGimage26.jpg";
import BGimage27 from "../../images/image-slider/BGimage27.jpg";
import BGimage28 from "../../images/image-slider/BGimage28.jpg";
import BGimage29 from "../../images/image-slider/BGimage29.jpg";

const rowOne = [
  BGimage1,
  BGimage2,
  BGimage3,
  BGimage4,
  BGimage5,
  BGimage6,
  BGimage7,
  BGimage8,
  BGimage24,
  BGimage25,
];

const rowTwo = [
  BGimage9,
  BGimage10,
  BGimage11,
  BGimage12,
  BGimage13,
  BGimage14,
  BGimage15,
  BGimage26,
  BGimage27,
  BGimage29,
];

const rowThree = [
  BGimage16,
  BGimage17,
  BGimage18,
  BGimage19,
  BGimage20,
  BGimage21,
  BGimage22,
  BGimage23,
  BGimage28,
];

function ImageSlider({ images, width }) {
  return (
    <div className="slider-line-one flex h-full opacity-75" style={{ width }}>
      <div className="image-stack flex py-1 relative h-full">
        {images.map((image, index) => (
          <img
            key={index}
            className="mx-1 h-full border-0 rounded-3xl"
            src={image}
            alt="decorative tile as part of background mosaic"
          />
        ))}
      </div>
      {/* Two sets of the same images are required for the loop illusion */}
      <div className="image-stack flex py-1 relative h-full">
        {images.map((image, index) => (
          <img
            key={index}
            className="mx-1 h-full border-0 rounded-3xl"
            src={image}
            alt="decorative tile as part of background mosaic"
          />
        ))}
      </div>
    </div>
  );
}

function ImageBanner() {
  return (
    <div className="absolute h-full w-full overflow-hidden">
      <div className=" relative imageBanner grid grid-rows-3 top-1/2 transform -translate-y-1/2">
        <ImageSlider images={rowOne} width="3848px" />
        <ImageSlider images={rowTwo} width="3948px" />
        <ImageSlider images={rowThree} width="3948px" />
      </div>
    </div>
  );
}

export default ImageBanner;

// rotate-45 -right-24 top-96
// 3148px
// 2880px
// 3456px
