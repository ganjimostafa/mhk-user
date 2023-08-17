import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./style.scss";

// import required modules
import { EffectCards, Autoplay } from "swiper";

function CardSlider({ images, title }) {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper"
      >
        {images.map((item, index) => (
          <SwiperSlide key={item}>
            <img
              src={item}
              alt={item.image_description}
              title={title}
              loading="lazy"
              key={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CardSlider;
