const express   = require ('express')
const app       = express()
const port      = 3000



// untuk mengambil data yg ter-encoded(enkripsi) dari form html yg dikirimkan melalui protokol http
app.use(express.urlencoded({extended: false}) ) 
app.set('view engine', 'ejs') // setting penggunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs


// include masing-masing model
const m_karyawan    = require('./models/m_karyawan')
const m_departemen  = require('./models/m_departemen')
const m_agama       = require('./models/m_agama')

//  include masing-masing controller
const c_karyawan    = require('./controller/c_karyawan')


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

app.get('/karyawan', c_karyawan.index)
app.get('/karyawan/detail/:id_karyawan', c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan', c_karyawan.hapus)
app.get('/karyawan/tambah', c_karyawan.tambah)
app.get('/karyawan/proses-insert', c_karyawan.insert)
app.get('/karyawan/edit/:id_karyawan', c_karyawan.edit)
app.get('/karyawan/proses-update/:id_karyawan', c_karyawan.update)

// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai dieksekusi
// async dan await selalu berpasangan


app.listen(port, function() {
    console.log(`Server sudah siap, buka http://localhost:` +port)
})

