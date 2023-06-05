import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@/component/Tabs";
import Icon from "@/component/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChannels,
  getAllChannels,
  setMoreAction,
} from "@/store/actions/home";
import { Drawer } from "antd-mobile-v2";
import Channels from "./components/Channels";
import ArticleList from "./components/ArticleList";
// import MoreAction from "./components/MoreAction";

export default function Home() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.home.userChannels);
  //控制高亮
  const [active, setActive] = useState(0);
  useEffect(() => {
    dispatch(getUserChannels());
    dispatch(getAllChannels());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.root}>
      {/* <Tabs tabs={tabs}> </Tabs> */}
      <Tabs
        tabs={tabs}
        index={active}
        onChange={(e) => {
          setActive(e);
          dispatch(
            setMoreAction({
              visible: false,
              articleId: "",
              channelId: tabs[e].id,
            })
          );
        }}
      >
        {/* 放对应数量的ArticleList */}
        {tabs.map((item) => (
          <ArticleList
            key={item.id}
            channelId={item.id}
            activeId={tabs[active].id}
          ></ArticleList>
        ))}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon
          type="iconbtn_channel"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
      {/* 频道管理组件 */}
      <Drawer
        className="my-drawer"
        position="right"
        children={""}
        sidebar={
          open && (
            <Channels
              onClose={onClose}
              index={active}
              onChange={(e) => setActive(e)}
            ></Channels>
          )
        }
        open={open}
        style={{ height: document.documentElement.clientHeight }}
      ></Drawer>
      {/* <MoreAction></MoreAction> */}
    </div>
  );
}
