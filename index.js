const express = require('express')
const { engine } = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (request, response) => {
 const title = request.body.title
 const pageqty = request.body.pageqty
 const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`
 conn.query(sql, function(err) {
    if (err) {
        console.log(err)
        return
    }
    response.redirect('/books')
 })
})

app.get('/books', (_request, response) => {
    const sql = 'SELECT * FROM books'
    conn.query(sql, function(err, data) {
    if (err) {
        console.log(err)
        return 
    }
    const books = data 
    console.log(books)
    response.render('books', { books })
})
 })

 app.get('/books/:id', (request, response) => {
    const id = request.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, function(err, data) {
    if (err) {
        console.log(err)
        return 
    }
    const book = data[0]
    response.render('books',{ book })
    })
 })

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9383',
    database: 'nodemysql',
})

conn.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao Mysql')
    app.listen(3000)
})