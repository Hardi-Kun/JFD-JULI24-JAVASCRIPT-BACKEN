const http = require('http')
const fs   = require('fs')

let server = http.createServer( function(request, respon){
    // console.log(request)
    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1>Halaman Beranda</h1>')
        respon.end()
    } else if (request.url == '/profil') {
        fs.createReadStream('./view/profil.html').pipe(respon)
    } else if (request.url == '/berita') {
        fs.createReadStream('./view/berita.html').pipe(respon)
    } else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1>404 Not Found</h1>')
        respon.end()
    }
})



server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000/')
})