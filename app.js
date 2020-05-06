// 載入 express 並建構應用程式伺服器
const express = require('express')
//載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器，引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
const routes = require('./routes')
// 引入config中的mongoose
require('./config/mongoose')


const app = express()

// 在 app.engine 應用程式裡新增了一個叫 hbs 的樣板引擎,還多了一組設定 extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，才能把預設的長檔名改寫成短檔名。
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 bodyParser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})