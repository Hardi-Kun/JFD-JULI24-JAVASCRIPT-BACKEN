const express =  require('express')
const app = express()
const port = 3000


app.get('/', function (req, res) {
    res.send('Hello World !!!')
})

//route --> rute
app.get('/hubungi', function(req, res) {
    res.send('<h1>Silahkan WA ke: 0833939392</h1>')
})


app.listen(port, function() {
    console.log(`Server sudah siap, buka http://localhost:` +port)
})

