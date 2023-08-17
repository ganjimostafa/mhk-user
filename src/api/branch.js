import { Axios } from "./request";

export function getBranch() {
  return Axios.get("branch_get_api/").then(({ data }) => data);
}
