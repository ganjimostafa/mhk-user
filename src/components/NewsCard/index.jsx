import timeIcon from "../../assets/icon/time.svg";
import forwardIcon from "../../assets/icon/forward.svg";
import Style from "./NewsCard.module.scss";
function NewsCard({ href, title, description, date, time }) {
  return (
    <a href={href} className={Style["root"]}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={Style["detail"]}>
        <img src={timeIcon}></img>
        <span>{date}</span>
        <span>{time}</span>
        <img className={Style["detail__forward"]} src={forwardIcon}></img>
      </div>
    </a>
  );
}

export default NewsCard;
