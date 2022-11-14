/** Memanggil model obat */
const obatModel = require(`../models/obat.model`)
/** call customer model */
const customerModel = require(`../models/customer.model`)
/** call transaksi model */
const transaksiModel = require(`../models/transaksi.model`)
/** call detai;_transaksi */
const detailModel = require(`../models/detail_transaksi.model`)


/** function untk menampilkan form transaksi  */
exports.showFormTransaksi = async (request, response) => {
    try {
        /** ambil data obat */
        let obat = await obatModel.findAll()
        /** ambil data customer */
        let customer = await customerModel.ambilDataCustomer()

        /** prepare data yang akan di passing ke view */
        let sendData = {
            dataObat: obat,
            dataCustomer: customer,
            page: `form-transaksi`,
            no_faktur: ``,
            tgl_transaksi: ``,
            dataObatString: JSON.stringify(obat),
            cart: request.session.cart,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menambahkan obat ke keranjang */
exports.addCart = async (request, response) => {
    try {
        /** get data obat berdasarkan id obat yg dikirimkan */
        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat
        })

        /** tampung / receive data yg dikirimkan */
        let storeData = {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }

        /** masukan data ke keranjang 
         * push() menambah data ke dalam array
        */
        request.session.cart.push(storeData)

        response.redirect(`/transaksi/add`)

        /** masukan data ke cart/keranjang menggunakn session */

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menghapus data item pada cart */
exports.deleteCart = async (request, response) => {
    try {
        /** ambil seluruh data cart pada session */
        let cart = request.session.cart
        /** ambil id obat yg akan di hapus dari cart */
        let id_obat = request.params.id

        /** cari tahu posisi index dari data yg akan di haapus */
        let index = cart.findIndex(item => item.id_obat == id_obat)

        /** hapus data sesuai index yg di masukan 
         * 
         * splice => untuk menghapus data pada array
        */
        cart.splice(index, 1)

        /** kembalikan data cart ke dalam session */
        request.session.cart = cart

        /** redirect ke halam form transaksi */
        return response.redirect(`/transaksi/add`)


    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** menyimpan data transaksi */
exports.simpanTransaksi = async (request, response) => {
    try {
        /** tampung data yg dikirimkan */
        let newTransaksi = {
            no_faktur: request.body.no_faktur,
            tgl_transaksi: request.body.tgl_transaksi,
            id_customer: request.body.id_customer,
            id_apoteker: request.session.dataUser.id
        }

        /** simpan transaksi */
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        /** menampung isi cart */
        let cart = request.session.cart
       
        /** looping  */
        for (let i = 0; i < cart.length; i++) {
            /** hapus data key nama obat dari cart */
            delete cart [i].nama_obat

            /** tambahkan key id transaksi */
            cart[i].id_transaksi = resultTransaksi.insertId

            /** simpan cart ke define detail_transaksi */
            await detailModel.add(cart[i])
        }

        /** kosongkan lagi cart (back to default) */
        request.session.cart = []

        /** kembalikan ke form transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan data transaksi */
exports.showDataTransaksi = async (request, response) => {  
    try {
        /** ambil data transaksi */
        let transaksi = await transaksiModel.findAll()

        /** sisipin data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
            /** ambil id transaki  */
            let id = transaksi[i].id

            /** ambil dta detail sesuai id */
            let detail = await detailModel.findByCriteria({ id_transaksi:id })

            /** sisipin detail ke transaksi nya */
            transaksi[i].detail = detail
        }

        /** prepare data yg dikirm ke view */
        let sendData = {    
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        /** return  */
        return response.render(`../views/index`, sendData)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menghaps data transaksi */
exports.deleteTransaksi = async (request, response) => {    
    try {
        //menampung data id utk di hapus
        let id = request.params.id

        //menghapus data detail transaksi
        await detailModel.delete({ id_transaksi: id })

        //menghapus data transaksi
        await transaksiModel.delete({ id: id })

        return response.redirect(`/transaksi`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}