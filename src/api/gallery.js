import { Axios } from "./request";

export function getGallerySlider() {
  return Axios.get("gallery_slider_api").then(({ data }) => data);
}

export function getGallery(page) {
  return Axios.get(`asset_image_get_api/?page=${page}`).then(
    ({ data }) => data
  );
}
