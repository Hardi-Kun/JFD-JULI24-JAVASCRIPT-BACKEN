const http = require('http')


http.createServer( function(request, respon){
    // mendeteksi status 200 (user berhasil terkoneksi dengan aplkasi kita)
    // Content-type: apa tipe konten yg akan diberikan ke user 
    // tex/plain itu akan menampilkan teks apa adanya
    // text/html akan merender tag html menjadi tampilan di browser
    respon.writeHead(200, {'Content-type': 'text/html'})
    // hasil akhir yg akan diberikan ke user
    respon.end('<h1>Halo Guys</h1>')
}).listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000/')
})
    
