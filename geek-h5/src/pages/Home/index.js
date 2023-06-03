import React, { useEffect } from "react";
import styles from "./index.module.scss";
import Tabs from "@/component/Tabs";
// import { CapsuleTabs } from "antd-mobile";
// import { DemoBlock } from "demos";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannels } from "@/store/actions/home";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserChannels());
  }, [dispatch]);
  // const tabs = [
  //   {
  //     id: 1,
  //     name: "sss",
  //   },
  // ];
  const tabs = useSelector((state) => state.home.userChannels);
  console.log(tabs);

  return (
    <div className={styles.root}>
      {/* <Tabs tabs={tabs}> </Tabs> */}
      <Tabs tabs={tabs}></Tabs>
    </div>
  );
}
