import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function NotFound() {
  const [time, setTime] = useState(3);
  const history = useHistory();
  const timeRef = useRef(-1);
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        timeRef.current = time - 1;
        return time - 1;
      });
      if (timeRef.current === 0) {
        clearInterval(timer);
        history.push("/home");
      }
    }, 1000);
  }, [history]);
  return (
    <div>
      <h1>对不起你访问的页面不存在。。。。</h1>
      <p>
        {time}秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  );
}
