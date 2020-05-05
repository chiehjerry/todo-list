// 載入 express 並建構應用程式伺服器
const express = require('express')
//載入 mongoose
const mongoose = require('mongoose')
//載入 express-handlebars
const exphbs = require('express-handlebars')
// 載入 Todo model
const Todo = require('./models/todo')

const app = express()

// 載入mongoose並設定連線，
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 在 app.engine 應用程式裡新增了一個叫 hbs 的樣板引擎,還多了一組設定 extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，才能把預設的長檔名改寫成短檔名。
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。
app.set('view engine', 'hbs')

// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})