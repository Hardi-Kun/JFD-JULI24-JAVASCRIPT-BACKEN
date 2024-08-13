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


// proses pengambilan data dari mysql OPEND
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


// proses pengambilan id dari db OPEND
app.get('/karyawan/detail/:id_karyawan', async function(req, res){
    //  ambil id yg dikirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await get_satukaryawan(idk)
    }
    res.render('karyawan/detail', dataview)
})


function get_satukaryawan(idk) {
    let sql =  
    `SELECT 
        karyawan.*, 
        departemen.kode AS kode_dept, departemen.nama AS nama_dept, 
        agama.nama AS nama_agama
    FROM karyawan
    LEFT JOIN departemen    ON departemen.id = karyawan.departemenn_id 
    LEFT JOIN agama         ON agama.id = karyawan.agama_id
    WHERE karyawan.id = ?
    ` ;
       return new Promise((resolve, reject) => {
            db.query(sql, [idk], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
        
    }
// proses pengambilan id dari db END


app.get('/karyawan/hapus:id_karyawan', async function (req, res){
    //  ambil id yg dikirim via url
    let idk = req.params.id_karyawan
    
    // proses hapus data
    try {
        let hapus = await hapus_satuKaryawan(idk)
        if (hapus.affectedRows > 0) {
                res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }  
})

function hapus_satuKaryawan(idk) {
    let sql =  
    `DELETE FROM karyawan
    WHERE id = ?
    ` ;
    return new Promise((resolve, reject) => {
        db.query(sql, [idk], function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
    
}
// proses penghapusan data END


app.get('/karyawan/tambah', function (req, res){
    res.render('karyawan/form-tambah')
})

app.listen(port, function() {
    console.log(`Server sudah siap, buka http://localhost:` +port)
})

