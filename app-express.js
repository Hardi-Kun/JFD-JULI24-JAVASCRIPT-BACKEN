const express   = require ('express')
const app       = express()
const port      = 3000



// untuk mengambil data yg ter-encoded(enkripsi) dari form html yg dikirimkan melalui protokol http
app.use(express.urlencoded({extended: false}) ) 
app.set('view engine', 'ejs') // setting penggunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs


// include
const m_karyawan    = require('./models/m_karyawan')
const m_departemen  = require('./models/m_departemen')
const m_agama       = require('./models/m_agama')


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


// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai dieksekusi
// async dan await selalu berpasangan
app.get('/karyawan', async function(req, res) {
    // ambil object
    let dataview = {
        karyawan: await m_karyawan.get_semuakaryawan(),
        message: req.query.msg,
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
        pegawai: await m_karyawan.get_satukaryawan(idk)
    }
    res.render('karyawan/detail', dataview)
})


app.get('/karyawan/hapus/:id_karyawan', async function (req, res){
    //  ambil id yg dikirim via url
    let idk = req.params.id_karyawan
    
    // proses hapus data
    try {
        let hapus = await m_karyawan.hapus_satuKaryawan(idk)
        if (hapus.affectedRows > 0) {
                res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }  
})


app.get('/karyawan/tambah', async function (req, res){
    let dataview = {
        dept: await m_departemen.get_semuaDepartemen(),
        agm: await m_agama.get_semuaAgama(),
    }
    res.render('karyawan/form-tambah', dataview)
})


app.post('/karyawan/proses-insert', async function (req,res){
    // terima kiriman data dari form html
    // let body = req.body
    try {
        let insert = await m_karyawan.insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil tambah karyawan a/n ${req.body.form_nama_lengkap}`)
        }
    } catch (error) {
        throw error
    }
})

app.get('/karyawan/edit/:id_karyawan', async function(req, res) {
    let idk = req.params.id_karyawan
    let dataview = {
        dept    : await m_departemen.get_semuaDepartemen(),
        agm     : await m_agama.get_semuaAgama(),
        pegawai : await m_karyawan.get_satukaryawan(idk),
    }
    res.render('karyawan/form-edit', dataview)
})


app.post('/karyawan/proses-update/:id_karyawan', async function(req,res) {
    let idk = req.params.id_karyawan
    try {
        let update = await m_karyawan.update_karyawan(req, idk)
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap}`)
        }
    } catch (error) {
        throw error
    }
})


app.listen(port, function() {
    console.log(`Server sudah siap, buka http://localhost:` +port)
})

