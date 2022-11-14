/** Panggil Model Customer */
const { response } = require("express")
const customerModel = require(`../models/customer.model`)
const { request } = require("../routes/customer.route")

/** request -> melihat data csutomer
 * response -> data customer melalui view
*/
exports.showDataCustomer = async (request, response) => {
    try {
        /**Ambil data customer menggunakan model */
        let dataCustomer = await customerModel.ambilDataCustomer()
        /**passing ke view */
        let sendData = {
            page: `customer`,
            data: dataCustomer,
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

/** fungsi utk menampilkan form customer utk tambah data */
exports.showTambahCustomer = async (request, response) => { 
    try {
        /**Prepare data yg akan di pasing ke view */
        let sendData = {    
            nama_customer:``,
            alamat:``,
            telepon:``,
            page:`form-customer`,
            targetRoute:`/customer/add`,
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

/** fungsi utk memproses data customer baru */
exports.prosesTambahData = async(request, response) => {    
    try {
        /** membaca data dari yang di isikan user */
        let newData = { 
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        await customerModel.tambahDataCustomer(newData)

        return response.redirect(`/customer`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form customer utk edit data yang telah ada dengan data yang masih ada di input */
exports.showEditCustomer = async (request, response) => {
    try {
        /** ambil data customer berdasarkan id */
        let id = request.params.id

        //menampung id ke dalam obj
        let parameter = {   
            id: id
        }

        //ambil data sesuai parameter
        let customer = await customerModel.ambilDataDenganParameter(parameter)

        /** Prepare data yg akan di passing ke view */
        let sendData = {
            nama_customer: customer[0].nama_customer,
            alamat: customer[0].alamat,
            telepon: customer[0].telepon,
            page: `form-customer`,
            targetRoute: `/customer/edit/${id}`,
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


/** fungsi utk update data customer */
exports.prosesEditCustomer = async (request, response) => {
    try {
        /** ambil data dari form-customer */
        let id = request.params.id

        /** ambil data customer berdasarkan id */
        let parameter = {
            id: id
        }
        
        let newData = {
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** Update data */
        await customerModel.updateDataCustomer(newData, parameter)

        return response.redirect(`/customer`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi delete data customer */
exports.prosesDeleteCustomer = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let id = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: id // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await customerModel.deleteDataCustomer(parameter)

        /** redirect to obat's page */
        return response.redirect(`/customer`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}