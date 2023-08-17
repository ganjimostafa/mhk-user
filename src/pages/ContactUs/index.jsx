import { useState, useEffect } from "react";

import Style from "./ContactUs.module.scss";
import locationIcon from "../../assets/icon/addlocation.svg";
import heart from "../../assets/icon/heart.svg";
import team from "../../assets/icon/team.svg";
import { getBranch } from "../../api/branch";
import phoneIcon from "../../assets/icon/phone.svg";
import { CircularProgress } from "@mui/material";

function ContactUs() {
  const [branches, setBranches] = useState([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);

  useEffect(() => {
    setIsLoadingBranches(true);
    getBranch()
      .then((data) => {
        setBranches(data);
        setIsLoadingBranches(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingBranches(true);
      });
  }, []);
  console.log(branches);

  return (
    <div className={Style["root"]}>
      <h3 className={Style["pageTitle"]}>ارتباط با ما</h3>
      <h3 className={Style["title"]}>تولید کننده و انجام دهنده خدمات صنعتی</h3>
      <p className={Style["description"]}>
        گروه تکنو صنعت نمونه با هدف خدمت گزاری به مشتریان برای ساخت و طراحی
        محصولات و دستگاه های سفارشی هر چه بهتر تلاش میکند. در خصوص راهنمایی برای
        شما، می‌توانید برای مشاوره در مورد سفارشات خود با ما در ارتباط باشید.
      </p>
      <div className={Style["options"]}>
        <div className={Style["options__item"]}>
          <img src={locationIcon} alt="locationIcon"></img>
          <div>
            <h4>مراجعه حضوری</h4>
            <p>
              با مراجعه به شعب منتخب ما در سایت، به صورت حضوری با نماینگان ما در
              .سراسر ایران محصول خود را سفارش دهید
            </p>
          </div>
        </div>
        <div className={Style["options__item"]}>
          <img src={heart} alt="heart"></img>
          <div>
            <h4>ارتباط با پشتبانی</h4>
            <p>
              پشتبانی دائم به صورت حضوری و مجازی، تماس با کارشناسان و پشتبانان
              شرکت به صورت 24 ساعته
            </p>
          </div>
        </div>
        <div className={Style["options__item"]}>
          <img src={team} alt="team"></img>
          <div>
            <h4>مشاوره رایگان</h4>
            <p>
              تیم فنی و کارشناسان ما همیشه در کنار شما برای ارائه نظر هستند،
              تنها با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
      {isLoadingBranches ? (
        <CircularProgress size={100} />
      ) : (
        branches.map((item) => (
          <div className={Style["branch"]}>
            <h4>{item.name}</h4>
            <div className={Style["branch__card"]}>
              <div key={item.id} className={Style["branch__card--description"]}>
                <h5>:آدرس </h5>
                <p>{item.address} </p>
                <h5> : شماره های تماس </h5>
                {item.phone_numbers === undefined
                  ? ""
                  : item.phone_numbers.map((obj, index) => (
                      <span key={index}>| {obj} </span>
                    ))}
                <img src={phoneIcon}></img>
              </div>
              <iframe src={item.location_url}></iframe>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default ContactUs;
