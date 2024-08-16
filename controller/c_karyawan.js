const m_karyawan    = require('../models/m_karyawan')
const m_departemen  = require('../models/m_departemen')
const m_agama       = require('../models/m_agama')

module.exports = 
{
    index: async function(req, res) {
        // ambil object
        let dataview = {
            karyawan: await m_karyawan.get_semuakaryawan(),
            message: req.query.msg,
        }
        res.render('karyawan/index', dataview)
    },

    detail: async function(req, res){
        //  ambil id yg dikirim via url
        let idk = req.params.id_karyawan
        // setelah itu kirim ke proses request data mysql
        let dataview = {
            pegawai: await m_karyawan.get_satukaryawan(idk)
        }
        res.render('karyawan/detail', dataview)
    },

    hapus: async function (req, res){
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
    },

    tambah: async function (req, res){
        let dataview = {
            dept: await m_departemen.get_semuaDepartemen(),
            agm: await m_agama.get_semuaAgama(),
        }
        res.render('karyawan/form-tambah', dataview)
    },

    insert: async function (req,res){
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
    },

    edit: async function(req, res) {
        let idk = req.params.id_karyawan
        let dataview = {
            dept    : await m_departemen.get_semuaDepartemen(),
            agm     : await m_agama.get_semuaAgama(),
            pegawai : await m_karyawan.get_satukaryawan(idk),
        }
        res.render('karyawan/form-edit', dataview)
    },

    update: async function(req,res) {
        let idk = req.params.id_karyawan
        try {
            let update = await m_karyawan.update_karyawan(req, idk)
            if (update.affectedRows > 0) {
                res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap}`)
            }
        } catch (error) {
            throw error
        }
    },


}