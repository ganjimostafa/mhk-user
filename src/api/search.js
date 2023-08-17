import { Axios } from "./request";
export function getSearchItems(query) {
  return Axios.get(`query_api/?q=${query}`).then(({ data }) => data);
}

export function getSingleSearch(id) {
    return Axios.get(`asset_get_api/${id}`).then(({ data }) => data);
  }