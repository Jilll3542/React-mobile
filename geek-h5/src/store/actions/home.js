import request from "@/utils/request";
import { SAVE_ALL_CHANNELS, SAVE_CHANNELS } from "../action_types/home";
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
