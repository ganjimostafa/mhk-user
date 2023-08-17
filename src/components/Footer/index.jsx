import { Link } from "react-router-dom";
import "./style.scss";
import instagram from "../../assets/icon/instagram.svg";
import telegram from "../../assets/icon/telegram.svg";
import link from "../../assets/icon/link.svg";

function Footer() {
  return (
    <div className="root">
      <div>
        تلفن : ۹۳۶۹۳۱۲۱۰۶-۹۸+ | ۳۲۷۱۹۶۶۰ - ۰۳۴ | پنج روز در هفته بجز روز های
        شنبه و جمعه ، ۶ ساعت در شبانه‌روز پاسخگوی شما هستیم. ( از ساعت ۱۰ الی ۱۲
        صبح و ۶ الی ۱۰ شب )
      </div>
      <div className="description">
        <h3>اسم شرکت، تولید کننده انواع قطعات صنعتی</h3>
        <p>
          گروه تولید تکنو صنعت نمونه با چهار دهه فعالیت در زمینه ساخت ماشین آلات
          صنعتی و کشاورزی، مخابراتی با ماشین آلات بروز به طراحی و تولید مشغول
          خدمت رسانی است.
        </p>
      </div>
      <div className="links">
        <div className="links__navigation">
          <a>محصولات</a> | <a>خدمات</a> | <a>سفارش محصول</a>
        </div>
        <div className="links__social">
          <a href="http://instagram.com/_u/t.s.n_kerman/">
            <img src={link}></img>
            <span>t.s.n_Kerman</span>
            <img src={instagram}></img>
          </a>
         
          <div className="links__social--trust">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
