/** Memanggil librarry crypt-js */
const crypto = require('crypto-js')

/** Membuat function untuk enkripsi */
exports.enkripsi = (plainText) => {  
    /** Secret key */
    let secretKey = `YTTA`
    /** proses enkripsi 
     * AES = Advanced Encryption Standart
    */
    let result = crypto.AES.encrypt(plainText, secretKey).toString()
    return result
} 

/** membuat function decryption */
exports.deskripsi = (chiperText) => {   
    /** Define secretKey */
    let secretKey = `YTTA`
    
    /** Proses decryption */
    let byte =  crypto.AES.decrypt(chiperText, secretKey)
    let result = byte.toString(crypto.enc.Utf8)
    return result
}