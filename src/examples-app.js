const express = require('express')
const path = require('path');

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.send('<h1>Westher</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Refael',
        age: 32
    },{
        name: 'Liron',
        age: 27
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.listen(3500, () => {
    console.log('Server is up on port 3000.')
})