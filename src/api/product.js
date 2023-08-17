import { Axios } from "./request";

export function getProducts(id, page) {
  return Axios.get(`category_objects_get_api/${id}/?page=${page}`).then(
    ({ data }) => data
  );
}

export function getSingleProduct(id) {
  return Axios.get(`asset_get_api/${id}`).then(({ data }) => data);
}

