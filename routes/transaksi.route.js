/** panggil express */
const express = require(`express`)

/** buat obj dari express */
const app = express()

/** ijin membaca data dari request */
app.use(express.urlencoded({ extended: true }))

/** controller transaski */
const transaksiController = require(`../controllers/transaksi.controller`)

/** panggil middleware  */
const authorization = require(`../middleware/authorization`)

/** define route utk menampilkam form transaksi */
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

/** define route utk simpan data transaksi */
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

/** define route utk menampilka data transaski */
app.get(`/` , authorization.cekUser , transaksiController.showDataTransaksi)   

/** define route utk menghapus data transaksi */
app.get(`/:id` , authorization.cekUser , transaksiController.deleteTransaksi)

/** export object app */
module.exports = app