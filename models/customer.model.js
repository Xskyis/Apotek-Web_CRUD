/**Function utk CRUD*/

// load dulu connection dari config
const connection = require('../config')

// function untuk mengambil data customer
exports.ambilDataCustomer = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from customer`

        //jalankan query
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk ambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from customer where ${params}`

        //jalankan query
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

//function utk menambah data customer baru
exports.tambahDataCustomer = (customer) => {
    return new Promise((resolve, reject) => {
        //ambil key dari object customer
        let key = Object
            .keys(customer)
            .join()
        // ambil value dari object customer
        let value = Object
            .keys(customer)
            .map(item => `"${customer[item]}"`)
            .join()

        let query = `insert into customer (${key}) values (${value})`

        //jalankan query
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

//function proses update data customer
exports.updateDataCustomer = (data, parameter) => {
    return new Promise((resolve, reject) => {
        //ambil key dari object customer
        let key = Object
            .keys(data)
            .map(item => `${item}="${data[item]}"`)
            .join()

        //ambil key dari object parameter
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `update customer set ${key} where ${params}`


        //jalankan query
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk menghapus data
exports.deleteDataCustomer = (parameter) => {
    return new Promise((resolve, rejected) => {
        /** -----------------------------------------
         * parameter contain data like this:
         * parameter = {
         *      id: '1'
         * }
         * 
         * to create Query for update data, we have to
         * arrange every key and its value of parameter
         * to be string
         * ----------------------------------------------
         */

        /** ----------------------------------------------
         * arrange list of parameter's keys and its value as string */
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        /** result:
         * params = ' id="1" '
         * ------------------------------------------------
         */

        /** create query for delete */
        let query = `delete from customer where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
} 




