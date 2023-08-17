import Main from "./pages/Main";
import ContactUs from "./pages/ContactUs";
// import AboutUs from "./pages/AboutUs";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Product from "./pages/Product";
import Service from "./pages/Serv";
import News from "./pages/News";
import Search from "./pages/Search";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product/:number" element={<Product />} />
        <Route path="/service/:number" element={<Service />} />
        <Route path="/news" element={<News />} />
        <Route path="/search/:query" element={<Search />} />
        
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;
