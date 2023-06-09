// 用户 Token 的本地缓存键名
const TOKEN_KEY = "geek-itcast-21";
const CHANNEL_KEY = "geek-itcast-21-channel";
/** * 从本地缓存中获取 Token 信息 */
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
};
/** * 将 Token 信息存入缓存 * @param {Object} tokenInfo 从后端获取到的 Token 信息 */
export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo));
};
/** * 删除本地缓存中的 Token 信息 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY);
};
/** * 判断本地缓存中是否存在 Token 信息 */
export const hasToken = () => {
  return !!getTokenInfo().token;
};
/**保存频道数据到本地 */
export const setLocalChannels = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels));
};
/**获取本地的频道数据，没有默认数据不要默认为空数组 */
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY));
};
/**刪除本地的频道数据 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY);
};
