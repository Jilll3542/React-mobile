import ArticleItem from "../ArticleItem";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
// import request from "@/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList } from "@/store/actions/home";
import { PullToRefresh, InfiniteScroll } from "antd-mobile";
// import { useState } from "react";
// import dayjs from "dayjs";
// import { relativeTime } from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, activeId }) => {
  // const [list, setList] = useState([]);

  // const [timestamp,setTimestamp]=useState()
  const dispatch = useDispatch();
  const current = useSelector((state) => state.home.articles[channelId]);

  useEffect(() => {
    //如果该频道有文章数据，没必要一进来就发送请求
    if (current) return;
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()));
    }
  }, [channelId, activeId, dispatch, current]);
  const onRefresh = async () => {
    //下拉刷新，需要重新加载最新的数据
    dispatch(getArticleList(channelId, Date.now()));
  };
  //是否有更多数据
  const [hasMore, setHasMore] = useState(true);
  //代表是否正在加载数据
  const [loading, setLoading] = useState(false);
  const loadMore = () => {
    // console.log("需要加载更多数据");
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("需要加载更多数据");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  //如果没有文章数据，可以先不渲染
  if (!current) {
    return null;
  }

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className="articles">
          {current.list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item}></ArticleItem>
            </div>
          ))}
        </div>
      </PullToRefresh>
      {/* 上拉加载更多 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  );
};

export default ArticleList;
