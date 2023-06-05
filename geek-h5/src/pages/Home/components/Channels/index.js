import Icon from "@/component/Icon";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useState } from "react";
import { addChannel, delChannel } from "@/store/actions/home";
import { Toast } from "antd-mobile";

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ onClose, index, onChange }) => {
  const userChannels = useSelector((state) => state.home.userChannels);
  const dispatch = useDispatch();
  //推荐频道
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home;
    return allChannels.filter((item) => {
      //如果这个频道在userChannels中，就不要
      return userChannels.findIndex((v) => v.id === item.id) === -1;
    });
  });
  // console.log(recommendChannels, "11");
  //切换
  const changeChannel = (i) => {
    //如果是编辑状态，不允许跳转
    if (editing) {
      return;
    }
    onChange(i);
    onClose();
  };
  //处理编辑状态
  const [editing, setEditing] = useState(false);
  //删除频道
  const del = (channel, i) => {
    // console.log(channel);
    if (userChannels.length <= 4) {
      Toast.show({
        content: "至少保留四个频道呦",
        duration: 1000,
      });
      return;
    }
    dispatch(delChannel(channel));
    //删除的时候需要处理高亮
    //高亮处理
    //如果删除的i和接受的index相等，默认让0高亮
    //如果删除的i小于index，默认让i-1高亮
    //如果删除的i大于index，不用处理
    if (i < index) {
      onChange(index - 1);
    } else if (i === index) {
      onChange(0);
    } else {
      onChange(i);
    }
  };
  const add = async (channel) => {
    await dispatch(addChannel(channel));
    Toast.show({
      icon: "success",
      content: "添加成功",
      duration: 1000,
    });
  };
  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div
          className={classNames("channel-item", {
            edit: editing,
          })}
        >
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing ? "点击删除频道" : "点击进入频道"}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "完成" : "编辑"}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classNames("channel-list-item", {
                  selected: index === i,
                })}
                key={item.id}
                onClick={() => changeChannel(i)}
              >
                {item.name}
                {/* 推荐不允许删除 */}
                {item.id !== 0 && (
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={() => {
                      del(item, i);
                    }}
                  ></Icon>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => (
              <span
                key={item.id}
                className="channel-list-item"
                onClick={() => add(item)}
              >
                + {item.name}
              </span>
            ))}
            {/* <span className="channel-list-item">+ 推荐1</span>
            <span className="channel-list-item">+ 推荐2</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
