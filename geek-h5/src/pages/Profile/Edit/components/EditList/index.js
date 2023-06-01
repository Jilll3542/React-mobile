import React from "react";
import styles from "./index.module.scss";

export default function EditInput({ onChange, config, type }) {
  const list = config[type];

  const changess = {
    visible: false,
    type: "",
  };

  const handleClick = () => {
    onChange(changess);
  };
  return (
    <div className={styles.root}>
      {/* <div className="list-item">男</div> */}
      {list.map((item) => (
        <div className="list-item" key={item.title} onClick={item.onClick}>
          {item.title}
        </div>
      ))}
      <div className="list-item" onClick={handleClick}>
        取消
      </div>
    </div>
  );
}
