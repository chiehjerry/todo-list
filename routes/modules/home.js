// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../../config/auth')


// 定義首頁路由
router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id }) // 取出 Todo model 裡的該使用者的資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})


// 匯出路由模組
module.exports = router