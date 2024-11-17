import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { ServiceData1 } from "../constants";

export default function HeroMain() {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-transparent">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {ServiceData1.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
