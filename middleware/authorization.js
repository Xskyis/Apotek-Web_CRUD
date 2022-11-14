/** fungsi authorization */
exports.cekUser = (request, response, next) => {    
    /** = utk mengecek data user di session
     *  
     * jika data tersimpan di session maka boleh utk mengakses fitur yg diinginkan
     * 
     * jika datanya tidak tersimpan di session maka akan dikembalikan ke hlm login
    */
    if(request.session.dataUser === undefined){ 
        return response.redirect(`/auth`)
    } else {    
        next()
    }
}