import React, { useEffect } from "react";
import styles from "./index.module.scss";
// import Tabs from "@/component/Tabs";
import { CapsuleTabs } from "antd-mobile";
import { DemoBlock } from "demos";
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

  return (
    <div className={styles.root}>
      {/* <Tabs tabs={tabs}> </Tabs> */}
      <DemoBlock title="超长自动滑动" padding="0">
        <CapsuleTabs defaultActiveKey="1">
          {tabs.map((btn) => {
            return (
              <CapsuleTabs.Tab title={btn.name} key={btn.title}>
                1
              </CapsuleTabs.Tab>
            );
          })}
        </CapsuleTabs>
      </DemoBlock>
      ; 首页 ssssss
    </div>
  );
}
