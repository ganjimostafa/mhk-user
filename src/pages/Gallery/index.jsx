
import { useEffect, useState, useLayoutEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Style from "./Gallery.module.scss";
import { getGallery } from "../../api/gallery";
import { CircularProgress } from "@mui/material";



function Gallery() {
  const [records, setRecords] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // const [images, setImages] = useState([]);

  useLayoutEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    console.log("fetchRecords");
    getGallery(page)
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
      <h3 className={Style["gallery_header"]}>
        گالری تصاویر
      </h3>
      <div className={Style["line"]}></div>
      
      <InfiniteScroll
        className={Style["root"]}
        dataLength={records.length}
        next={fetchRecords()}
        hasMore={hasMore}
        loader={<CircularProgress sx={{margin:"20px"}}/>}
      >
        {records.map((record) => (
          <img src={record.image_url} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Gallery;
