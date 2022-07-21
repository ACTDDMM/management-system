// 设置
export function setToken(tokenKey, token) {
  return localStorage.setItem(tokenKey, token);
}
// 获取
export function getToken(tokenKey, token) {
  return localStorage.getItem(tokenKey, token);
}
// 删除
export function removeToken(tokenKey, token) {
  return localStorage.removeItem(tokenKey, token);
}
