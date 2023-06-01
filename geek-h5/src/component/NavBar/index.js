import React from "react";
import Icon from "@/component/Icon";
// import "./index.scss"
import styles from "./index.module.scss";
// 自己渲染的组件没办法获取路由信息
import { useHistory } from "react-router-dom";

function NavBar({ children, extra, onLeftClick }) {
  const history = useHistory();
  const back = () => {
    // 跳回上一页
    // console.log(navigate)
    if (onLeftClick) {
      onLeftClick();
    } else {
      history.go(-1);
    }
  };
  return (
    <div>
      {/* 顶部工具栏 */}
      <div className={styles.root}>
        {/* 后退按钮 */}
        <div className="left">
          <Icon type="iconfanhui" onClick={back} />
        </div>
        {/* 居中标题 */}
        <div className="title">{children}</div>

        {/* 右侧内容 */}
        <div className="right">{extra}</div>
      </div>
    </div>
  );
}
export default NavBar;
