import React from 'react'
import NavBar from '@/component/NavBar'
import styles from './index.module.scss'
import Input from "@/component/Input"
export default function Login() {
  const onExtraClick= ()=>{
     
  }
  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              {/* <input
                className="input"
                name="mobile"
                placeholder="请输入手机号"
                autoComplete="off"
              /> */}
              <Input placeholder="请输入手机号"></Input>
            </div>
            {/* <div className="validate">手机号验证错误信息</div> */}
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              {/* <input
                className="input"
                name="code"
                placeholder="请输入验证码"
                maxLength={6}
                autoComplete="off"
              /> */}
              <Input placeholder="请输入验证码" extra="获取验证码" onExtraClick={onExtraClick}></Input>
              {/* <div className="extra">获取验证码</div> */}
            </div>
            <div className="validate">验证码验证错误信息</div>
          </div>

          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
