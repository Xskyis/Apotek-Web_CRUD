/** panggil express */
const express = require(`express`)

/** buat obj dari express */
const app = express()

/** ijin membaca data dari request */
app.use(express.urlencoded({ extended: true }))

/** controller transaski */
const  homeController = require(`../controllers/home.controller`)

/** panggil middleware  */
const authorization = require(`../middleware/authorization`)

/** define route utk show home page */
app.get(`/` , authorization.cekUser , homeController.showHome)

module.exports = app