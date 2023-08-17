//TODO: Adding Active Link to li tags => todo 1, todo 2

import { useEffect, useState } from "react";
import { CircularProgress, Fade, IconButton } from "@mui/material";
import { MenuRounded, ArrowForwardRounded } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./style.scss";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { getProductCategory } from "../../api/category";
import { getServiceCategory } from "../../api/category";

import Popover from "@mui/material/Popover";
import { shadows } from "@mui/system";
import arrowBack from "../../assets/icon/arrowback.svg";

const RIGHT_HEADER = [
  { name: "صفحه اصلی", href: "/", title: "" },
  { name: "محصولات", href: "/products", title: "" },
  { name: "اخبار و اطلاعیه ها", href: "/news", title: "" },
];

function NavBar() {
  //START:variable:This is a toggler for collapsing the Navbar in mobile size
  const [collapse, setCollapse] = useState(false);
  //END

  const location = useLocation();

  const [selected, setSelected] = useState("/");

  //! scroll action for displaying navbar
  const [show, setShow] = useState(true);

  //.......................
  const [anchorElProduct, setAnchorElProduct] = useState(null);
  const handleOpenProduct = (event) => {
    setAnchorElProduct(event.currentTarget);
  };
  const handleCloseProduct = () => {
    setAnchorElProduct(null);
  };
  const openProduct = Boolean(anchorElProduct);
  const idProduct = openProduct ? "simple-popover" : undefined;
  //........................
  const [anchorElProductSub, setAnchorElProductSub] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(false);
  const handleOpenSubProduct = (event) => {
    setAnchorElProductSub(event.currentTarget);
    setSelectedProductCategory(!selectedProductCategory);
  };
  const handleCloseSubProduct = () => {
    setAnchorElProductSub(null);
    setSelectedProductCategory(false);
  };
  const openProductSub = Boolean(anchorElProductSub);
  const idProductSub = openProductSub ? "simple-popover" : undefined;
  //........................
  const [catProductId, setCatProductId] = useState();
  useEffect(() => {}, [catProductId]);
  //...............
  //.......................
  const [anchorElService, setAnchorElService] = useState(null);
  const handleOpenService = (event) => {
    setAnchorElService(event.currentTarget);
  };
  const handleCloseService = () => {
    setAnchorElService(null);
  };
  const openService = Boolean(anchorElService);
  const idService = openService ? "simple-popover" : undefined;
  //........................
  const [anchorElServiceSub, setAnchorElServiceSub] = useState(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(false);
  const handleOpenSubService = (event) => {
    setAnchorElServiceSub(event.currentTarget);
    setSelectedServiceCategory(!selectedServiceCategory);
  };
  const handleCloseSubService = () => {
    setAnchorElServiceSub(null);
    setSelectedServiceCategory(false);
  };
  const openServiceSub = Boolean(anchorElServiceSub);
  const idServiceSub = openServiceSub ? "simple-popover" : undefined;
  //........................
  const [catServiceId, setCatServiceId] = useState();
  useEffect(() => {}, [catServiceId]);
  //...............

  useEffect(() => {
    if (location.pathname !== "/") {
      setShow(true);
      var scroll = 0;
      window.addEventListener("scroll", () => {
        if (scroll > window.scrollY) {
          setShow(true);
        } else {
          setShow(false);
        }
        scroll = window.scrollY;
      });
    }
  }, []);
  //START:function:This function is toggling the value of collapse variable between true and false
  var handleCollapse = () => setCollapse(!collapse);
  //END

  useEffect(() => {
    console.log(location);
    setSelected(location.pathname + location.hash);
  }, [location]);

  const [IsLoadingProductCategory, setIsLoadingProductCategory] =
    useState(false);
  const [productCategory, setProductCategory] = useState([]);
  useEffect(() => {
    setIsLoadingProductCategory(true);
    getProductCategory()
      .then((data) => {
        setProductCategory(data);
        setIsLoadingProductCategory(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingProductCategory(true);
      });
  }, []);

  const [IsLoadingServiceCategory, setIsLoadingServiceCategory] =
    useState(false);
  const [serviceCategory, setServiceCategory] = useState([]);
  useEffect(() => {
    setIsLoadingServiceCategory(true);
    getServiceCategory()
      .then((data) => {
        setServiceCategory(data);
        setIsLoadingServiceCategory(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingServiceCategory(true);
      });
  }, []);

  const handleSelectedCategory = () => {};

  return (
    <>
      <nav className={`navbar ${show ? "navbar__show" : ""}`}>
        <Fade in={collapse} timeout={500}>
          <div className="navbar__sidebar">
            {/* <div className="navbar__sidebar--left" onClick={handleCollapse}></div> */}
            <div className="navbar__sidebar--right" onClick={handleCollapse}>
              <ul className="navbar__menu">
                {RIGHT_HEADER.map((item) => (
                  <li key={item.name} onClick={handleCollapse}>
                    <a
                      href={item.href}
                      className="navbar__menu--link"
                      title={item.title}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Fade>
        <IconButton className="navbar__menu--toggler" onClick={handleCollapse}>
          {collapse && (
            <Fade in={collapse} timeout={{ enter: 700, exit: 700 }}>
              <ArrowForwardRounded />
            </Fade>
          )}
          {!collapse && (
            <Fade in={!collapse} timeout={{ enter: 700, exit: 700 }}>
              <MenuRounded />
            </Fade>
          )}
        </IconButton>
        <div className="navbar__container">
          <img src={logo} alt="#" loading="lazy" />
          <ul>
            <li className={selected === "/" ? "active" : ""}>
              <a href="/" title="">
                صفحه اصلی
              </a>
            </li>
            <li className={selected === "/products" ? "active" : ""}>
              <button onClick={handleOpenProduct}>محصولات</button>
            </li>
            <li className={selected === "/products" ? "active" : ""}>
              <button onClick={handleOpenService}>خدمات</button>
            </li>
            <li className={selected === "/news" ? "active" : ""}>
              <a href={"/news"} title="">
                اخبار و اطلاعیه ها
              </a>
            </li>

            <a href="/contact" className="navbar__container--contact">
              تماس بگیرید
            </a>
          </ul>
        </div>

        {/* {openProduct ? <div onClickOutside className="mega-menu">salam</div> : null}
      {openService ? <div className="mega-menu">salam</div> : null} */}

        <Popover
          id={idProduct}
          open={openProduct}
          anchorEl={anchorElProduct}
          onClose={handleCloseProduct}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 90, left: 100 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: { width: "97%", height: "600px" },
          }}
          sx={{ direction: "rtl", boxShadow: 0 }}
        >
          {IsLoadingProductCategory ? (
            <CircularProgress sx={{ margin: "200px" }} />
          ) : (
            <div className="mega__menu">
              <ul>
                {productCategory.map((item) =>
                  item.sub_categorys.length === 0 ? (
                    <li className="mega__first">
                      <a
                        className="mega__first--button"
                        href={`product/${item.id}`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ) : (
                    <li
                      key={item.id}
                      className={
                        selectedProductCategory & (item.id === catProductId)
                          ? "mega__first--selected"
                          : "mega__first"
                      }
                    >
                      <button
                        className={
                          selectedProductCategory & (item.id === catProductId)
                            ? "mega__first--button__selected"
                            : "mega__first--button"
                        }
                        onClick={(event) => {
                          handleOpenSubProduct(event);
                          setCatProductId(item.id);
                        }}
                      >
                        {item.name}
                      </button>
                      {item.id === catProductId && (
                        <Popover
                          id={idProductSub}
                          open={openProductSub}
                          anchorEl={anchorElProductSub}
                          onClose={handleCloseSubProduct}
                          anchorReference="anchorPosition"
                          anchorPosition={{ top: 115, left: 400 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          PaperProps={{
                            style: { width: "70%" },
                          }}
                          sx={{ direction: "rtl" }}
                          elevation={0}
                        >
                          <div>
                            {item.sub_categorys.map((obj) =>
                              obj.sub_categorys.length === 0 ? (
                                <a
                                  className="mega__second"
                                  style={{ display: "block" }}
                                  href={`product/${obj.id}`}
                                >
                                  {obj.name}
                                </a>
                              ) : (
                                <div>
                                  <li id={obj.id} className="mega__second">
                                    {obj.name}
                                    <img src={arrowBack}></img>
                                  </li>
                                  {obj.sub_categorys.map((object) => (
                                    <a
                                      className="mega__second"
                                      style={{ display: "block" }}
                                      href={`product/${object.id}`}
                                    >
                                      {object.name}
                                    </a>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        </Popover>
                      )}
                    </li>
                  )
                )}
              </ul>
              <div></div>
            </div>
          )}
        </Popover>

        <Popover
          id={idService}
          open={openService}
          anchorEl={anchorElService}
          onClose={handleCloseService}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 90, left: 100 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: { width: "97%", height: "600px" },
          }}
          sx={{ direction: "rtl", boxShadow: 0 }}
        >
          {IsLoadingServiceCategory ? (
            <CircularProgress sx={{ margin: "200px" }} />
          ) : (
            <div className="mega__menu">
              <ul>
                {serviceCategory.map((item) =>
                  item.sub_categorys.length === 0 ? (
                    <li className="mega__first">
                      <a
                        className="mega__first--button"
                        href={`service/${item.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {item.name}
                      </a>
                    </li>
                  ) : (
                    <li
                      key={item.id}
                      className={
                        selectedServiceCategory & (item.id === catServiceId)
                          ? "mega__first--selected"
                          : "mega__first"
                      }
                    >
                      <button
                        className={
                          selectedServiceCategory & (item.id === catServiceId)
                            ? "mega__first--button__selected"
                            : "mega__first--button"
                        }
                        onClick={(event) => {
                          handleOpenSubService(event);
                          setCatServiceId(item.id);
                        }}
                      >
                        {item.name}
                      </button>
                      {item.id === catServiceId && (
                        <Popover
                          id={idServiceSub}
                          open={openServiceSub}
                          anchorEl={anchorElServiceSub}
                          onClose={handleCloseSubService}
                          anchorReference="anchorPosition"
                          anchorPosition={{ top: 115, left: 400 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          PaperProps={{
                            style: { width: "70%", height: "500px" },
                          }}
                          sx={{ direction: "rtl" }}
                          elevation={0}
                        >
                          <div>
                            {item.sub_categorys.map((obj) =>
                              obj.sub_categorys.length === 0 ? (
                                <a
                                  className="mega__second"
                                  style={{ display: "block" }}
                                  href={`service/${obj.id}`}
                                >
                                  {obj.name}
                                </a>
                              ) : (
                                <div>
                                  <li id={obj.id} className="mega__second">
                                    {obj.name}
                                    <img src={arrowBack}></img>
                                  </li>
                                  {obj.sub_categorys.map((object) => (
                                    <a
                                      className="mega__second"
                                      style={{ display: "block" }}
                                      href={`service/${object.id}`}
                                    >
                                      {object.name}
                                    </a>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        </Popover>
                      )}
                    </li>
                  )
                )}
              </ul>
              <div></div>
            </div>
          )}
        </Popover>
      </nav>
    </>
  );
}

export default NavBar;
