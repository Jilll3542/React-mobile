import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@/component/Tabs";
import Icon from "@/component/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannels, getAllChannels } from "@/store/actions/home";
import { Drawer } from "antd-mobile-v2";
import Channels from "./components/Channels";

export default function Home() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.home.userChannels);
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
      <Tabs tabs={tabs}></Tabs>
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
        sidebar={open && <Channels onClose={onClose}></Channels>}
        open={open}
        style={{ height: document.documentElement.clientHeight }}
      ></Drawer>
    </div>
  );
}
