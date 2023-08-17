import { useParams } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { getServices, getSingleService } from "../../api/service";
import InfiniteScroll from "react-infinite-scroll-component";
import Style from "./Service.module.scss";
import shopIcon from "./../../assets/icon/shopping.svg";

import { Box, CircularProgress, Modal } from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "280px",
  width: "350px",
  borderRadius: "10px",
};

function Service() {
  const { number } = useParams();
  const [records, setRecords] = useState([]);
  const [singleService, setSingleService] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState();
  const [isLoadingSingleService, setIsLoadingSingleService] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useLayoutEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    getServices(number, page)
      .then((data) => {
        setRecords([...records, ...data.results]);
        setPage(page + 1);
        setHasMore(data.length > 0);
        setCount(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFetchSingleService = (id) => {
    setIsLoadingSingleService(true);
    getSingleService(id)
      .then((data) => {
        setSingleService(data);
        setIsLoadingSingleService(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingSingleService(true);
      });
  };

  return (
    <InfiniteScroll
      className={Style["root"]}
      dataLength={records.length}
      next={fetchRecords()}
      hasMore={hasMore}
      loader={<CircularProgress />}
    >
      {count === 0 ? (
        <h3>محصولی در این دسته بندی نیست</h3>
      ) : (
        records.map((record) => (
          <div
            onClick={() => {
              handleOpen();
              handleFetchSingleService(record.id);
            }}
            className={Style["card"]}
            key={record.id}
          >
            <img
              alt={record.image.image_tag}
              src={record.image.image_url}
            ></img>
            <div className={Style["card__label"]}>
              <span className={Style["card__label--category"]}>
                {record.category_name}
              </span>
              <span className={Style["card__label--tag"]}>
                <span className={Style["card__label--tag__dot"]}></span>
                {record.asset_tag_name}
              </span>
            </div>
            <span className={Style["card__line"]}></span>
            <h4>{record.name}</h4>
            <p>{record.description.slice(0, 150)}...</p>
            <a>تماس بگیرید</a>
          </div>
        ))
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        {isLoadingSingleService ? (
          <CircularProgress size={200} />
        ) : (
          <Box sx={BoxStyle}>
            <div className={`slide-container ${Style["slide-container"]}`}>
              <Slide>
                {singleService.images?.map((slideImage, index) => (
                  <div key={index}>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${slideImage.image_url})`,
                      }}
                    ></div>
                  </div>
                ))}
              </Slide>
            </div>
            <div className={Style["modal__first"]}>
              <h2 className={Style["modal__title"]}>{singleService.name}</h2>
              <span className={Style["modal__label"]}>
                <span className={Style["modal__label__dot"]}></span>
                {singleService.asset_tag_name}
              </span>
            </div>
            <p className={Style["modal__para"]}>{singleService.description}</p>
            <div className={Style["modal__buttons"]}>
              <a className={Style["modal__order"]} href="/contact">
                سفارش محصول
                <img src={shopIcon} />
              </a>
              <button className={Style["modal__back"]} onClick={handleClose}>
                بازگشت
              </button>
            </div>
          </Box>
        )}
      </Modal>
    </InfiniteScroll>
  );
}
const BoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  width: "100%",
  maxWidth: 700,
  height: "100%",
  maxHeight: 800,
  bgcolor: "background.paper",
  direction: "rtl",
  // display:"flex",
  // flexDirection:"column",
  // alignItems:"center",
  fontFamily: "vazir-regular",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
};
export default Service;
