import Icon from "@/component/Icon";
import { Modal, Toast } from "antd-mobile";
import { useState } from "react";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setMoreAction,
  unLikeArticle,
  reportArticle,
} from "@/store/actions/home";

/**
 * 举报反馈菜单
 */
const list = [
  { id: 0, title: "其他问题" },
  { id: 1, title: "标题夸装" },
  { id: 2, title: "低俗色情" },
  { id: 3, title: "收拾收拾" },
];
const FeedbackActionMenu = () => {
  // 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
  const [type, setType] = useState("normal");
  const dispatch = useDispatch();
  const moreAction = useSelector((state) => state.home.moreAction);
  // 关闭弹框时的事件监听函数
  const onClose = () => {
    dispatch(
      setMoreAction({
        visible: false,
        articleId: "",
      })
    );
    setType("normal");
  };
  const unlike = async () => {
    await dispatch(unLikeArticle(moreAction.articleId));
    onClose();
    Toast.show({
      content: "拉黑成功",
    });
  };
  const report = async (id) => {
    await dispatch(reportArticle(moreAction.articleId, id));
    onClose();
    Toast.show({
      content: "举报成功",
    });
  };
  const children = (
    <div className="more-action">
      {/* normal 类型时的菜单内容 */}
      {type === "normal" && (
        <>
          <div className="action-item">
            <Icon type="iconicon_unenjoy1" onClick={unlike} /> 不感兴趣
          </div>
          <div className="action-item" onClick={() => setType("junk")}>
            <Icon type="iconicon_feedback1" />
            <span className="text">反馈垃圾内容</span>
            <Icon type="iconbtn_right" />
          </div>
          <div className="action-item">
            <Icon type="iconicon_blacklist" /> 拉黑作者
          </div>
        </>
      )}

      {/* junk 类型时的菜单内容 */}
      {type === "junk" && (
        <>
          <div className="action-item" onClick={() => setType("normal")}>
            <Icon type="iconfanhui" />
            <span className="back-text">反馈垃圾内容</span>
          </div>

          {list.map((item) => (
            <div
              className="action-item"
              key={item.id}
              onClick={() => report(item.id)}
            >
              {item.title}
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div className={styles.root}>
      {Modal.show({
        className: "more-action-modal",
        title: "",
        onClose: onClose,
        visible: moreAction.visible,
        content: children,
      })}
    </div>
  );
};

export default FeedbackActionMenu;
