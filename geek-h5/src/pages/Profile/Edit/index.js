import { useEffect, useRef, useState } from "react";
import NavBar from "@/component/NavBar";
import { List, DatePicker, Toast, Modal } from "antd-mobile";
import dayjs from "dayjs";
import { Drawer } from "antd-mobile-v2";
// import { useHistory, } from 'react-router-dom'
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updatePhoto,
  updateProfile,
  logout,
} from "@/store/actions/profile";
import classNames from "classnames";
import EditInput from "./components/EditInput";
import EditList from "./components/EditList";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ProfileEdit() {
  const history = useHistory();
  const fileRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState({
    visible: false,
    type: "",
  });
  //控制列表抽屉的显示和隐藏
  const [listOpen, setListOpen] = useState({
    visible: false,
    type: "",
  });
  const config = {
    photo: [
      {
        title: "拍照",
        onClick: () => {
          //触发点击事件
          console.log("拍照");
        },
      },
      {
        title: "本地选择",
        onClick: () => {
          fileRef.current.click();
        },
      },
    ],
    gender: [
      {
        title: "男",
        onClick: () => {
          //   console.log("男");
          //   dispatch(updateProfile({ gender: 0 }));
          onCommit("gender", 0);
        },
      },
      {
        title: "女",
        onClick: () => {
          //   console.log("女");
          //   dispatch(updateProfile({ gender: 1 }));
          onCommit("gender", 1);
        },
      },
    ],
  };
  const onBirthdayChange = (e) => {
    console.log(e);
    onCommit("birthday", dayjs(e).format("YYYY-MM-DD"));
  };
  const handleChange = (newValue) => {
    setListOpen(newValue);
  };
  // const history = useHistory()
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen({
      visible: false,
      type: "",
    });
    setListOpen({
      visible: false,
      type: "",
    });
  };
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  // 获取 redux 中的 profile 数据
  const profile = useSelector((state) => state.profile.profile);
  const onCommit = async (type, value) => {
    console.log(type, value);
    await dispatch(
      updateProfile({
        [type]: value,
      })
    );
    Toast.show({
      icon: "success",
      content: "修改成功",
    });
    onClose();
  };
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    //把文件上传到服务器
    const fd = new FormData();
    fd.append("photo", file);
    await dispatch(updatePhoto(fd));
    Toast.show({
      icon: "success",
      content: "修改头像成功",
    });
    onClose();
  };
  const logoutFn = () => {
    //1.显示弹窗
    //2.删除token（包括redux和本地）
    //3.跳转登录页面
    Modal.show({
      content: "温馨提示, 你确定要退出吗?",
      closeOnAction: true,

      actions: [
        { text: "取消" },
        {
          text: "确定",
          onClick() {
            dispatch(logout());
            //跳转到登录页面
            history.replace("/login");
            //提示
            Toast.show({
              icon: "success",
              content: "退出登录成功",
            });
          },
        },
      ],
    });
  };
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}

        <NavBar>个人信息</NavBar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="???" />
                </span>
              }
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: "photo",
                });
              }}
            >
              头像
            </List.Item>

            <List.Item
              extra={profile.name}
              onClick={() => {
                setOpen({ visible: true, type: "name" });
              }}
            >
              昵称
            </List.Item>

            <List.Item
              clickable
              extra={
                <span
                  className={classNames("intro", profile.intro ? "normal" : "")}
                >
                  {profile.intro || "未填写"}
                </span>
              }
              onClick={() => {
                setOpen({ visible: true, type: "intro" });
              }}
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item
              extra={profile.gender === 0 ? "男" : "女"}
              onClick={() => {
                setListOpen({ visible: true, type: "gender" });
              }}
            >
              性别
            </List.Item>

            <List.Item
              onClick={() => {
                setVisible(true);
              }}
              extra={
                <DatePicker
                  title="时间选择"
                  mode="date"
                  visible={visible}
                  value={new Date(profile.birthday)}
                  onClose={() => {
                    setVisible(false);
                  }}
                  onConfirm={onBirthdayChange}
                  max={new Date()}
                  min={new Date(1900, 1, 1, 0, 0, 0)}
                  // onConfirm={val => {
                  //     Toast.show(val.toDateString())
                  // }}
                >
                  {(value) =>
                    value ? dayjs(value).format("YYYY-MM-DD") : "请选择"
                  }
                </DatePicker>
              }
            >
              生日
            </List.Item>
          </List>
        </div>

        {/* 文件选择框，用于头像图片的上传 */}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={onFileChange}
        />
        {/* 底部栏：退出登录按钮 */}
        <div className="logout" onClick={logoutFn}>
          <button className="btn">退出登录</button>
        </div>
      </div>
      {/* 全屏抽屉组件 */}
      <Drawer
        position="left"
        className="drawer"
        open={open.visible}
        sidebar={
          open.visible && (
            <div
              style={{
                minHeight: document.documentElement.clientHeight,
                backgroundColor: "#fff",
                width: "100%",
              }}
            >
              <EditInput
                onClose={onClose}
                type={open.type}
                onCommit={onCommit}
              ></EditInput>
            </div>
          )
        }
      >
        {""}
      </Drawer>
      {/* 列表的抽屉组件，头像，性别 */}
      <Drawer
        className="drawer-list"
        position="bottom"
        open={listOpen.visible}
        onOpenChange={onClose}
        sidebar={
          listOpen.visible && (
            <EditList
              onChange={handleChange}
              config={config}
              onClose={onClose}
              type={listOpen.type}
            ></EditList>
          )
        }
      >
        {""}
      </Drawer>
    </div>
  );
}
