import React, { useRef, useEffect } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useState } from "react";

export default function TextArea({ maxLength = 100, className, ...rest }) {
  const [value, setValue] = useState(rest.value || "");
  const onValueChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (rest.onChange) {
      rest.onChange(e);
    }
  };
  const textRef = useRef(null);
  useEffect(() => {
    textRef.current.focus();
    //默认光标在最后一个
    textRef.current.setSelectionRange(-1, -1);
  }, []);
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        className={classNames("textarea", className)}
        maxLength={maxLength}
        {...rest}
        value={value}
        ref={textRef}
        onChange={onValueChange}
      ></textarea>
      {/* 当前最大允许字数 */}
      <div className="count">
        {value.length}/{maxLength}{" "}
      </div>
    </div>
  );
}
