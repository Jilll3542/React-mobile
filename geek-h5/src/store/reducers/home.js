import {
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
  SAVE_CHANNELS,
  SAVE_MORE_ARTICLE_LIST,
} from "../action_types/home";

const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
  moreAction: { visible: false, articleId: "", channelId: "" },
};
export default function reducer(state = initValue, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      };
    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload,
      };
    case SAVE_ARTICLE_LIST:
      const { list, timestamp, loadMore, channelId } = payload;
      //如果loadMore为true，就是加载更多数据不应该覆盖，应该追加
      return {
        ...state,
        articles: {
          ...state.articles,
          [channelId]: {
            timestamp: timestamp,
            list: loadMore
              ? [...state.articles[channelId].list, ...list]
              : list,
          },
        },
      };
    case SAVE_MORE_ARTICLE_LIST:
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: [...state.articles[payload.channelId].list, ...payload.list],
          },
        },
      };
    case "home/setMoreAction":
      return {
        ...state,
        moreAction: payload,
      };
    default:
      return state;
  }
  // console.log(action);
  // return state;
}
