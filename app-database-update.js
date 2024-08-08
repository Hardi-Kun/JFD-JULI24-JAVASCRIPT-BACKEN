const http  = require('http') // modulbawaan dari node.js
const mysql = require('mysql2') // modul dari node_modules

//  konfigurasi database mysql yg ingin digunakan
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})

let sql = 
    `UPDATE karyawan 
    SET Nama = 'Prabowo'
    WHERE id = '13'`
// menyambungkan atau membuka koneksi
db.connect()

// ambil data dari mysql
db.query(sql, function(error, hasil) {
    if (error) {
        console.log(error)
    } else {
        // console.log(hasil)
        if (hasil.affectedRows > 0) {
            console.log('berhasil insert data karyawan')
        }
    }
})

db.end()