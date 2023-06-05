import ArticleItem from "../ArticleItem";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
// import request from "@/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList, getMoreArticleList } from "@/store/actions/home";
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
    setHasMore(true);
    await dispatch(getArticleList(channelId, Date.now()));
  };
  //是否有更多数据
  const [hasMore, setHasMore] = useState(true);
  //代表是否正在加载数据
  const [loading, setLoading] = useState(false);
  const loadMore = async () => {
    // console.log("需要加载更多数据");
    //如果在加载中，不允许重复加载
    if (loading) {
      return;
    }
    //如果不是当前的频道，也不需要加载
    if (channelId !== activeId) return;
    //如果没有timestamp,如果没有更多数据，就不懂发送给请求
    if (!current.timestamp) {
      setHasMore(false);
      return;
    }
    setLoading(true);

    try {
      await dispatch(getMoreArticleList(channelId, current.timestamp));
    } finally {
      setLoading(false);
    }
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
              <ArticleItem article={item} channelId={channelId}></ArticleItem>
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
