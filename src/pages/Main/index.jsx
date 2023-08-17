import { useState, useEffect } from "react";

import SearchIcon from "../../assets/icon/search.svg";
import Style from "./Main.module.scss";
import Carousel from "../../components/Carousel";
import CardSlider from "../../components/CardSlider";

import Landing from "../../assets/images/landing.jpg";
import pic from "../../assets/icon/pic.svg";
import quality from "../../assets/icon/quality.svg";
import worker from "../../assets/icon/worker.svg";
import support from "../../assets/icon/support.svg";
import arrow from "../../assets/icon/arrow.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { getGallerySlider } from "../../api/gallery";

import card1 from "../../assets/images/slider/1.png";
import card2 from "../../assets/images/slider/2.png";
import card3 from "../../assets/images/slider/3.png";
import card4 from "../../assets/images/slider/4.png";
import card5 from "../../assets/images/slider/5.png";
import card6 from "../../assets/images/slider/6.png";
import NewsCard from "../../components/NewsCard";
import { CircularProgress } from "@mui/material";
import { getNewsSlider } from "../../api/news";

const images = [card1, card2, card3, card4, card5, card6];

function Main() {
  const [gallerySlider, setGallerySlider] = useState([]);
  const [newsSlider, setNewsSlider] = useState([]);

  const [isLoadingGallerySlider, setIsLoadingGallerySlider] = useState(false);
  const [isLoadingNewsSlider, setIsLoadingNewsSlider] = useState(false);

  useEffect(() => {
    setIsLoadingGallerySlider(true);
    getGallerySlider()
      .then((data) => {
        setGallerySlider(data);
        setIsLoadingGallerySlider(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingGallerySlider(true);
      });
  }, []);

  useEffect(() => {
    setIsLoadingNewsSlider(true);
    getNewsSlider()
      .then((data) => {
        setNewsSlider(data);
        setIsLoadingNewsSlider(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingNewsSlider(true);
      });
  }, []);

  return (
    <div className={Style["root"]}>
      <div className={Style["landing"]}>
        <img src={Landing}></img>
        <div className={Style["landing__description"]}>
          <h3>تولید کننده انواع قطعات و دستگاه‌های صنعتی</h3>
          <p>
            گروه تولید تکنو صنعت نمونه با چهار دهه فعالیت در زمینه ساخت ماشین
            آلات صنعتی و کشاورزی، مخابراتی با ماشین آلات بروز به طراحی و تولید
            مشغول خدمت رسانی است.
          </p>
          <div className={Style["landing__description--search"]}>
            <a href="/search/?query">
              <img src={SearchIcon} alt="" />
            </a>
            <input placeholder="جستجو در محصولات و اخبار"></input>
          </div>
        </div>
      </div>

      <div className={Style["gallery"]}>
        <h4>آرشیو تصاویر و ویدیوهای سایت</h4>
        {isLoadingGallerySlider ? (
          <CircularProgress size={100} sx={{ margin: "auto" }} />
        ) : (
          <Carousel images={gallerySlider}></Carousel>
        )}
        <a href="/gallery">
          <span> همه تصاویر </span>
          <img src={pic} />
        </a>
      </div>

      <div className={Style["options"]}>
        <div className={Style["options__description"]}>
          <h3>بزرگترین تولید کننده انواع ماشین الات صنعتی</h3>
          <div className={Style["options__description--item"]}>
            <span> کیفت محصول را تضمین میکنیم</span>
            <img src={quality}></img>
          </div>
          <div className={Style["options__description--item"]}>
            <span>
              بهترین محصولات را با توامند ترین افراد برای شما می‌سازیم
            </span>
            <img src={worker}></img>
          </div>
          <div className={Style["options__description--item"]}>
            <span> مشورت رایگان با تیم تخصصی ما را داشته باشید </span>
            <img src={support}></img>
          </div>
          <a href="/contact">
            <span> با کارشناسان فنی ما مستقیم صحبت کنید </span>
            <img src={arrow}></img>
          </a>
        </div>
        <CardSlider images={images}></CardSlider>
      </div>

      <div className={Style["news"]}>
        <h4>آخرین اخبار</h4>
        {isLoadingNewsSlider ? (
          <CircularProgress
            size={100}
            sx={{ display: "flex", margin: "auto" }}
          />
        ) : (
          <Swiper className={Style["news__slider"]} slidesPerView={3}>
            {newsSlider.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className={Style["news__slider--slide"]}
              >
                <NewsCard
                  href="/news"
                  title={item.title}
                  description={`${item.text.slice(0, 200)} ...`}
                  date={item.date_time.slice(0, 10)}
                  time={item.date_time.slice(11, 16)}
                  loading="lazy"
                  key={item.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Main;
