import React, { useState, useEffect, useRef } from "react";
import Icon from "@/component/Icon";
import Input from "@/component/Input";
import NavBar from "@/component/NavBar";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getTokenInfo } from "@/utils/storage";
import { getUser } from "@/store/actions/profile";
// import { Toast } from "antd-mobile";

export default function Chat() {
  const photo = useSelector((state) => state.profile.user.photo);
  const [msg, setMsg] = useState("");
  const [messageList, setMessageList] = useState([
    // { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    // { type: "user", text: "你好" },
  ]);
  const history = useHistory();
  const clientRef = useRef("");
  const listRef = useRef("");
  const dispatch = useDispatch();
  //socket的连接
  useEffect(() => {
    //获取用户信息
    dispatch(getUser());
    //sockit io 的连接对象
    //client.close()关闭连接
    //client.on()监听事件
    //client.emit()主动给服务器发送消息
    const client = io("https://geek.itheima.net", {
      query: {
        token: getTokenInfo().token,
      },
      transports: ["websocket"],
    });
    clientRef.current = client;
    //连接服务器成功的事件
    client.on("connect", function () {
      // Toast.show({
      //   icon: "success",
      //   content: "连接服务器成功，开始聊天吧",
      //   duration: 1000,
      // });
      setMessageList((messageList) => {
        return [
          ...messageList,
          { type: "robot", text: "我是小智，有什么想要问我的？" },
        ];
      });
    });
    //接受到服务器的事件
    client.on("message", function (e) {
      setMessageList((state) => {
        return [
          ...state,
          {
            type: "robot",
            text: e.msg,
          },
        ];
      });
    });
    return () => {
      //组件销毁的时候，需要断开socket连接
      client.close();
    };
  }, [dispatch]);
  useEffect(() => {
    //当messageList发生变化，就发生滚动
    //让滚动条滚动到最底部
    listRef.current.scrollTop =
      listRef.current.scrollHeight - listRef.current.offsetHeight;
  }, [messageList]);
  const onKeyUp = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    if (!msg) return;
    setMessageList([
      ...messageList,
      {
        type: "user",
        text: msg,
      },
    ]);
    //回车的时候需要给服务器发送消息
    //把自己的消息添加到消息列表中
    clientRef.current.emit("message", { msg, timestamp: Date.now() });
    //清空消息
    setMsg("");
  };
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        style={{ position: "fixed", top: 0 }}
        className="fixed-header"
        onLeftClick={() => history.go(-1)}
      >
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) => {
          if (item.type === "robot") {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img
                  src={
                    photo || "http://toutiao.itheima.net/images/user_head.jpg"
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyUp={onKeyUp}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
}
