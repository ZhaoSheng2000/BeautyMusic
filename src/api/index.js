import request from "./request";
export function defaultGet(url) {
  return request({
    url: url,
    method: "get",
    withCredentials: true
  });
}
export function defaultPost(url,data) {
  return request({
    url: url,
    method: "post",
    data: data
  });
}