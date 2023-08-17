import { Axios } from "./request";

export function getProductCategory() {
  return Axios.get("category_objects_get_api/?t=product").then(({ data }) => data);
}

export function getServiceCategory() {
    return Axios.get("category_objects_get_api/?t=service").then(({ data }) => data);
  }
