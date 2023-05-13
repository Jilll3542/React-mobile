import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from "@/store"
import { Provider } from 'react-redux'
//引入通用样式

import "./assets/styles/index.scss"

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.getElementById('root'))
