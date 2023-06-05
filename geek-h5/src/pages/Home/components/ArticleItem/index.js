import Icon from "@/component/Icon";
import classnames from "classnames";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./index.module.scss";

dayjs.extend(relativeTime);

/**
 * 文章列表项组件
 * @param {String} articleId 文章ID
 * @param {Number} coverType 封面类型：0-无图|1-单图|3-三图
 * @param {Array} coverImages 封面图片
 * @param {String} title 标题
 * @param {String} authorName 作者
 * @param {Number} commentCount 回复数
 * @param {String} publishDate 发布日期
 */
const ArticleItem = ({ article }) => {
  // console.log(article);
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article;
  // const { type, images } = cover;

  return (
    <div className={styles.root}>
      {/* t3代表三图结构，none-mt代表没有图片结构 */}
      <div
        className={classnames("article-content", {
          t3: type === 3,
          "none-mt": type === 0,
        })}
      >
        {/* 标题 */}
        <h3>{title}</h3>

        {/* 封面图 */}
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => {
              return (
                <div className="article-img-wrapper" key={i}>
                  <img src={item} alt="" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 底部信息栏 */}
      <div className={classnames("article-info", type === 0 ? "none-mt" : "")}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).from(Date.now())}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
