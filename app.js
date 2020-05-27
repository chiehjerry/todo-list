// 載入 express 並建構應用程式伺服器
const express = require('express')
//載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 載入 express-session
const session = require('express-session')
// 載入 passport
const passport = require('passport')
// 載入 connect-flash   
const flash = require('connect-flash')
// 引用路由器，引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
const routes = require('./routes')
// 引入config中的mongoose
require('./config/mongoose')


const app = express()
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000


// 在 app.engine 應用程式裡新增了一個叫 hbs 的樣板引擎,還多了一組設定 extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，才能把預設的長檔名改寫成短檔名。
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 bodyParser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
//用 app.use 註冊這個 middlewave，並使用 session(option) 來設定相關選項
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

// 使用 Connect flash
app.use(flash())


// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  // 辨識使用者是否已經登入的變數，讓 view 可以使用
  res.locals.isAuthenticated = req.isAuthenticated()
  // 新增兩個 flash message 變數 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 將 request 導入路由器
app.use(routes)


// 設定 port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})