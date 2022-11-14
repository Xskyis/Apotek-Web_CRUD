
/** function untk menampilkan halaman logic */
exports.showHome = async (request, response) => {
    try {
        /**passing ke view */
        let sendData = {
            page: `home`,
            /** passing data user yg login dari session */
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