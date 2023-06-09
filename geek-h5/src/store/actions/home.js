import request from "@/utils/request";
import {
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
  SAVE_CHANNELS,
  SAVE_MORE_ARTICLE_LIST,
} from "../action_types/home";
import { getLocalChannels, hasToken, setLocalChannels } from "@/utils/storage";
/**
 *
 * @returns 获取用户的频道
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    console.log("asdada");
    //1.判断用户是否登录
    if (hasToken()) {
      const res = await request.get("/user/channels");
      dispatch(saveUserChannels(res.data.channels));
      console.log("aaaa");
      setLocalChannels(res.data.channels);
    } else {
      //2.没有token，从本地获取频道数据
      console.log("sssssss");
      const channels = getLocalChannels();
      if (channels) {
        console.log("sssdfhdskss");
        //没有token，但本地有channels数据
        dispatch(saveUserChannels(channels));
      } else {
        //没有token，且本地没有channels数据
        console.log("cccccc");
        const res = await request.get("/user/channels");
        dispatch(saveUserChannels(res.data.channels));
        //保存到本地
        setLocalChannels(res.data.channels);
      }
    }
  };
};
//保存用户频道到redux中
export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  };
};
//获取所有频道
export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request.get("/channels");
    dispatch(saveAllChannels(res.data.channels));
  };
};

export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  };
};
//删除频道
export const delChannel = (channel) => {
  //如果用户登录了，发送请求删除频道
  //如果用户没有登录，删除本地中的频道
  //不管等不登录，都要修改redux中频道
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels;
    if (hasToken()) {
      //发送请求
      await request.delete("/user/channels/" + channel.id);
      //同步频道中的数据到redux中
      dispatch(
        saveUserChannels(userChannels.filter((item) => item.id !== channel.id))
      );
    } else {
      //没有登录
      //修改本地，修改redux
      const result = userChannels.filter((item) => item.id !== channel.id);
      dispatch(saveUserChannels(result));
      setLocalChannels(result);
    }
  };
};
//添加频道
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    const channels = [...getState().home.userChannels, channel];
    if (hasToken()) {
      //发请求添加
      await request.patch("/user/channels", {
        channels: [channel],
      });
      dispatch(saveUserChannels(channels));
    } else {
      dispatch(saveUserChannels(channels));
      dispatch(setLocalChannels(channels));
    }
  };
};

//获取文章列表数据
export const getMoreArticleList = (channelId, timestamp, loadMore = false) => {
  return async (dispatch) => {
    const res = await request({
      url: "/articles",
      method: "get",
      params: {
        channel_id: channelId,
        timestamp: Date.now(),
      },
    });

    dispatch(
      setMoreArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        loadMore,
      })
    );
  };
};

//获取文章列表数据
export const getArticleList = (channelId, timestamp, loadMore = false) => {
  return async (dispatch) => {
    const res = await request({
      url: "/articles",
      method: "get",
      params: {
        channel_id: channelId,
        timestamp: Date.now(),
      },
    });

    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        loadMore,
      })
    );
  };
};

export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload,
  };
};
export const setMoreArticleList = (payload) => {
  return {
    type: SAVE_MORE_ARTICLE_LIST,
    payload,
  };
};
export const setMoreAction = (payload) => {
  return {
    type: "home/setMoreAction",
    payload,
  };
};

export const unLikeArticle = (articleId) => {
  return async (dispatch, getState) => {
    await request({
      method: "post",
      url: "/article/dislikes",
      data: {
        target: articleId,
      },
    });
    // const list = getState()
    dispatch(setArticleList(getState().home));
    //把当前频道对应的文章删除
    const channelId = getState().home.moreAction.channelId;
    const articles = getState().home.articles[channelId];
    dispatch(
      setArticleList({
        channelId,
        timestamp: articles.timestamp,
        list: articles.list.filter((item) => item.art_id !== articleId),
      })
    );
  };
};

// export const reportArticle = (articleid, reportId) => {};

export const reportArticle = (articleId, reportId) => {
  return async (dispatch, getState) => {
    await request({
      method: "post",
      url: "/article/reports",
      data: {
        target: articleId,
        type: reportId,
      },
    });
    // const list = getState()
    dispatch(setArticleList(getState().home));
    //把当前频道对应的文章删除
    const channelId = getState().home.moreAction.channelId;
    const articles = getState().home.articles[channelId];
    dispatch(
      setArticleList({
        channelId,
        timestamp: articles.timestamp,
        list: articles.list.filter((item) => item.art_id !== articleId),
      })
    );
  };
};
