/** Panggil Model Apoteker */
const { response } = require("express")
const apotekerModel = require(`../models/apoteker.model`)
const { request } = require("../routes/apoteker.route")

/** panggil file crypt.js */
const crypt = require(`../crypt`)


/** request -> melihat data apoteker
 * response -> data apoteker melalui view
*/
exports.showDataApoteker = async (request, response) => {
    try {
        /**Ambil data customer menggunakan model */
        let dataApoteker = await apotekerModel.ambilDataApoteker()
        /**passing ke view */
        let sendData = {
            page: `apoteker`,
            data: dataApoteker,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form apoteker utk tambah data */
exports.showTambahApoteker = async (request, response) => { 
    try {
        /**Prepare data yg akan di pasing ke view */
        let sendData = {    
            nama_apoteker:``,
            username:``,
            password:``,
            page:`form-apoteker`,
            targetRoute:`/apoteker/add`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render('../views/index' , sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data apoteker baru */
exports.prosesTambahData = async(request, response) => {
    try {
        /** membaca data dari yang di isikan user */
        let newData = { 
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        await apotekerModel.tambahDataApoteker(newData)

        return response.redirect(`/apoteker`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form apoteker utk edit data yang telah ada dengan data yang masih ada di input */
exports.showEditApoteker = async (request, response) => {
    try {
        /** ambil data apoteker berdasarkan id */
        let id = request.params.id

        //menampung id ke dalam obj
        let parameter = {   
            id: id
        }

        //ambil data sesuai parameter
        let apoteker = await apotekerModel.ambilDataDenganParameter(parameter)

        /** Prepare data yg akan di passing ke view */
        let sendData = {
            nama_apoteker: apoteker[0].nama_apoteker,
            username: apoteker[0].username,
            password: apoteker[0].password,
            page: `form-apoteker`,
            targetRoute: `/apoteker/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data apoteker yang telah di edit */
exports.prosesEditData = async (request, response) => {
    try {
        /** membaca data dari yang di isikan user */
        let newData = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        /** ambil id dari parameter */
        let id = request.params.id

        /** buat objek parameter */
        let parameter = {
            id: id
        }

        await apotekerModel.updateDataApoteker(newData, parameter)

        return response.redirect(`/apoteker`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi delete data apoteker */
exports.prosesDeleteApoteker = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let id = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: id // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await apotekerModel.deleteDataApoteker(parameter)

        /** redirect to apoteker page */
        return response.redirect(`/apoteker`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
