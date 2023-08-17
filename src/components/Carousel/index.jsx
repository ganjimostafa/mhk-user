import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.scss";

function Carousel({ images, title }) {
  return (
    <Swiper
      modules={[Autoplay,Pagination, Navigation]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="slider"
    >
      {images.map((item, index) => (
        <SwiperSlide key={item}>
          <img
            src={item.image_url}
            alt={item.image_description}
            title={title}
            loading="lazy"
            key={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

Carousel.propTypes = {
  images: PropTypes.array,
  title: PropTypes.string,
};

export default Carousel;
