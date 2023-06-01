import React, { lazy, Suspense } from "react";
import styles from "./index.module.scss";
import Icon from "@/component/Icon";
import { useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const QA = lazy(() => import("@/pages/QA"));
const Video = lazy(() => import("@/pages/Video"));
const Profile = lazy(() => import("@/pages/Profile"));

const buttons = [
  { id: 1, title: "首页", to: "/home/index", icon: "iconbtn_home" },
  { id: 2, title: "问答", to: "/home/question", icon: "iconbtn_qa" },
  { id: 3, title: "视频", to: "/home/video", icon: "iconbtn_video" },
  { id: 4, title: "我的", to: "/home/profile", icon: "iconbtn_mine" },
];
export default function Layout() {
  // 获取路由历史 history 对象
  const history = useHistory();

  // 获取路由信息 location 对象
  const location = useLocation();
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        {/* 配置二级路由 */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/home/index" exact component={Home}></Route>
            <Route path="/home/question" component={QA}></Route>
            <Route path="/home/video" component={Video}></Route>
            <Route path="/home/profile" component={Profile}></Route>
          </Switch>
        </Suspense>
      </div>

      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {buttons.map((btn) => {
          // 判断当前页面路径和按钮路径是否一致，如果一致则表示该按钮处于选中状态
          const selected = btn.to === location.pathname;
          // console.log(selected)
          return (
            <div
              key={btn.id}
              className={classnames(
                "tabbar-item",
                selected ? "tabbar-item-active" : ""
              )}
              onClick={() => history.push(btn.to)}
            >
              <Icon type={btn.icon + (selected ? "_sel" : "")} />
              <span>{btn.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
