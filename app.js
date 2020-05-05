// 載入 express 並建構應用程式伺服器
const express = require('express')
//載入 mongoose
const mongoose = require('mongoose')
//載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
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

// 用 app.use 規定每一筆請求都需要透過 bodyParser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//設定新增一筆資料路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

//設定一條新的路由，來接住表單資料，並且把資料送往資料庫。這個步驟就是 CRUD 裡的 Create 動作。
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))

})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})