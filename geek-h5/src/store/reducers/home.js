import { SAVE_CHANNELS } from "../action_types/home";

const initValue = { userChannels: [] };
export default function reducer(state = initValue, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      };
    default:
      return state;
  }
  // console.log(action);
  // return state;
}
