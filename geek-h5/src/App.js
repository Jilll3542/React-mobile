import React, { Suspense } from "react"
// import "./App.scss"
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom"


const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Home'))
export default function App() {
  return <Router>
    <div className="app">
      <Link to="/login">登录</Link>
      <Link to="/home">首页</Link>
      <Suspense fallback={<div>loading...  </div>}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          {/* <Navigate exact from="/" to="/home"></Navigate> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={(<Home />)}></Route>

        </Routes>
      </Suspense>
    </div>
  </Router>
}