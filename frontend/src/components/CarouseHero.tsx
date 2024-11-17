import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import { ServiceData2 } from "../constants";

// import required modules
import { Pagination } from "swiper/modules";

export default function CarouseHero() {
  return (
    <>
      <div className="flex items-center justify-center flex-col h-[200px] px-5 py-10 bg-blue-gray-50">
        <Swiper
          slidesPerView={9}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="w-full px-10 py-8 bg-white shadow-2"
        >
          {ServiceData2.map((item, index) => (
            <SwiperSlide key={index} className="w-[50px]">
              <div className="w-30 h-30">
                <img
                  src={item.image}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
