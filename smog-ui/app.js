const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/chart.js/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/chartjs-plugin-annotation/'));

app.get('/contact', (req, res) => res.sendFile(__dirname + '/contact/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))