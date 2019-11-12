const express = require('express');
var path = require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/src//index.html')))
app.use(express.static('images'))
app.use(express.static('src'))

app.listen(port, () => console.log(`Game is running at http://localhost:${port}`))