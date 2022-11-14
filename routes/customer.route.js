/** Panggil Express*/
const express = require(`express`)

/** buat objext app */
const app = express()

/**minta izin untuk membaca data yang dikirmkan melalui form */
app.use(express.urlencoded({ extended:true }))

/** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** panggil controller customer */
const customerController = require(`../controllers/customer.controller`)

/** define route utk akses data customer */
app.get("/", authorization.cekUser, customerController.showDataCustomer)

/** define route utk menampilkan form customer */
app.get("/add" , authorization.cekUser, customerController.showTambahCustomer)

/** define route utk memproses data yg ditambah */
app.post("/add" , authorization.cekUser, customerController.prosesTambahData)

/** define route utk menampilkan edit page */
app.get("/edit/:id" , authorization.cekUser, customerController.showEditCustomer)

/** define route utk memproses edit data */
app.post("/edit/:id" , authorization.cekUser, customerController.prosesEditCustomer)

/** define route utk memproses delete data */
app.get("/delete/:id" , authorization.cekUser, customerController.prosesDeleteCustomer)

/** define route utk memproses delete data */
app.post("/delete/:id" , authorization.cekUser, customerController.prosesDeleteCustomer)

/**export oobject app */
module.exports = app