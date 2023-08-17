import { Axios } from "./request";

export function getNewsSlider() {
  return Axios.get("news_slider_api/").then(({ data }) => data);
}

export function getNews(page) {
  return Axios.get(`news_get_api/?page=${page}`).then(({ data }) => data);
}
