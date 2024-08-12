const express   = require ('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})
db.connect()


app.set('view engine', 'ejs') // setting penggunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs


app.get('/', function (req, res) {
    res.send('Hello World !!!')
})

//route --> rute
app.get('/hubungi', function(req, res) {
    let data_hub = {
        No_Telp: '085959576221',
        Email: 'mhardiansyah0406@gmail.com',
        Ig: 'mhardisyh',
    
    }
    res.render('hubungi', data_hub)
})


app.get('/profil', function(req, res) {
    let data = {
        jabatan : 'Senior Programmer',
        gender : 'Laki',
        gaji: 10000000

    }
    res.render('profil-developer',data)
    // error, karena express tidak membaca file dengan extensi .html
    // res.send(require('./view/profil.html'))
})


// proses pengambilan data dari mysql (INI AGAK RUMIT HARUS DIIPAKSA)
function get_semuakaryawan () {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `karyawan`", function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
               resolve(hasil)
            }
        })
    })
}


// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai dieksekusi
// async dan await selalu berpasangan
app.get('/karyawan', async function(req, res) {
     let dataview = {
        karyawan: await get_semuakaryawan()
    }
    res.render('karyawan/index', dataview)
})
// proses pengambilan data dari mysql END


app.listen(port, function() {
    console.log(`Server sudah siap, buka http://localhost:` +port)
})

