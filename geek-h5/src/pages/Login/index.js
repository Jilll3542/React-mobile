import React from 'react'
import NavBar from '@/component/NavBar'
import styles from './index.module.scss'
import Input from "@/component/Input"
import { useFormik } from "formik"
import * as Yup from 'yup'
import classNames from 'classnames'
export default function Login() {
  const onExtraClick = () => {

  }
  const formik = useFormik({
    // 设置表单字段的初始值
    initialValues: {
      mobile: '13900001111',
      code: '246810'
    },
    // 提交
    onSubmit: values => {
      console.log(values)
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字')
    })
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,

  } = formik

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">

              <input type="text" autoComplete='' />
              <Input
                placeholder="请输入手机号"
                value={mobile}
                name="mobile"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={11}
              ></Input>
              {errors.code && touched.code && (
                <div className="validate">{errors.code}</div>
              )}
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
              <Input
                placeholder="请输入验证码"
                extra="获取验证码"
                onExtraClick={onExtraClick}
                value={code}
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                maxLength={6}
              ></Input>
              {errors.code && touched.code && (
                <div className="validate">{errors.code}</div>
              )}
              {/* <div className="extra">获取验证码</div> */}
            </div>

            {/* <div className="validate">验证码验证错误信息</div> */}
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className={classNames('login-btn', isValid ? '' : 'disabled')}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
