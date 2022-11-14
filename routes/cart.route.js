/** panggil express */
const express = require(`express`)

/** bikin obj express */
const app = express()

/** minta ijin */
app.use(express.urlencoded({ extended:true }))

/** panggil transaksi */
const transaksiController = require(`../controllers/transaksi.controller` )

/** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** define route */
app.post(`/` , authorization.cekUser, transaksiController.addCart)

/** define route delete transaksi */
app.get(`/:id` , authorization.cekUser, transaksiController.deleteCart)

/** export object app */
module.exports = app
