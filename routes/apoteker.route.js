/** Panggil Express*/
const express = require(`express`)

/** buat objext app */
const app = express()

/**minta izin untuk membaca data yang dikirmkan melalui form */
app.use(express.urlencoded({ extended:true }))

/** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** panggil controller apoteker */
const apotekerController = require(`../controllers/apoteker.controller`)

/** define route utk akses data customer */
app.get("/", authorization.cekUser, apotekerController.showDataApoteker)

/** define route utk menampilkan form customer */
app.get("/add" , authorization.cekUser, apotekerController.showTambahApoteker)

/** define route utk memproses data yg ditambah */
app.post("/add" , authorization.cekUser, apotekerController.prosesTambahData)

/** define route utk menampilkan edit page */
app.get("/edit/:id" , authorization.cekUser, apotekerController.showEditApoteker)

/** define route utk memproses edit data */
app.post("/edit/:id" , authorization.cekUser, apotekerController.prosesEditData)

/** define route utk memproses delete data */
app.get("/delete/:id" , authorization.cekUser, apotekerController.prosesDeleteApoteker)

/** define route utk memproses delete data */
app.post("/delete/:id" , authorization.cekUser, apotekerController.prosesDeleteApoteker)

/**export oobject app */
module.exports = app