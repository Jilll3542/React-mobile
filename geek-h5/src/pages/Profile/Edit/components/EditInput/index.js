import React from "react";
import styles from "./index.module.scss";
import NavBar from "@/component/NavBar";
import TextArea from "@/component/TextArea";
// import { useSto } from 'react-redux'
import { useState } from "react";
import Input from "@/component/Input";
import { useSelector } from "react-redux";

export default function EditInput({ onClose, type, onCommit }) {
  // const [name,setName] = useState("nihaoaaa")
  const defaultValue = useSelector((state) => state.profile.profile[type]);
  const [value, setValue] = useState(defaultValue || "");
  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onClose}
        extra={
          <span
            className="commit-btn"
            onClick={() => {
              onCommit(type, value);
            }}
          >
            提交
          </span>
        }
      >
        编辑{type === "name" ? "昵称" : "简介"}
      </NavBar>
      <div className="content-box">
        <h3>{type === "name" ? "昵称" : "简介"}</h3>
        {/* 回显内容 */}
        {type === "name" ? (
          <Input
            className="input-wrap"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoFocus
          ></Input>
        ) : (
          <TextArea
            value={value}
            maxLength={200}
            onChange={(e) => {
              setValue(e.target.value);
              // console.log(e.target.value);
            }}
          ></TextArea>
        )}
      </div>

      {/* <TextArea maxLength={200} placeholder="请输入昵称" value={name} onChange={(e)=>{setName(e)}}></TextArea> */}
    </div>
  );
}
