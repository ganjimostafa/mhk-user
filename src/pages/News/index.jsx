import { useEffect, useState, useLayoutEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Style from "./News.module.scss";
import { getNews } from "../../api/news";
import { CircularProgress } from "@mui/material";

function News() {
  const [records, setRecords] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // const [images, setImages] = useState([]);

  useLayoutEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    console.log("fetchRecords");
    getNews(page)
      .then((data) => {
        setRecords([...records, ...data.results]);

        setPage(page + 1);
        setHasMore(data.length > 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3 className={Style["news_header"]}>اخبار و اطلاعیه ها</h3>

      <InfiniteScroll
        className={Style["root"]}
        dataLength={records.length}
        next={fetchRecords()}
        hasMore={hasMore}
        loader={<CircularProgress sx={{ margin: "20px" }} />}
      >
        {records.map((record) => (
          <div className={Style["news__item"]}>
            <div className={Style["news__item--title"]}>
              <h3>{record.title}</h3>
              <span>
                {record.date_time.slice(0, 10)}
                {`${" "}`}
                {record.date_time.slice(11, 16)}
              </span>
            </div>
            <img src={record.image} alt={record.image_tag} />
            <p>{record.text}</p>
            <div>
              <a></a>
              <a></a>
            </div>
            <hr style={{ width: "100%", color: "gray" }} />
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default News;
