const session = require('express-session')
const express = require(`express`)
const router = require("./routers")
const app = express()
const PORT = 3000

app.set(`view engine`, `ejs`)
app.use(express.urlencoded ({extended:true}))
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'IntelliTrade',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: false },
}))

app.use(router)

app.listen(PORT, () => {
    console.log(`Dimension ${PORT}`);
})