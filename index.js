const { response } = require('express')
const express = require('express')
const { engine } = require('express-handlebars')
const mysql = require('mysql')

const app = express()

//ler o bory
app.use(
    express.urlencoded({
        extended: true
    })
)

// toda requisição do body é transformada em obj json
app.use(express.json()) 

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (_request, response) => {
    response.render('home')
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


app.get('books/edit/:id', (request, response) => {
 const id = request.params.id
 const sql = `SELECT * FROM books WHERE id = ${id}`
 conn.query(sql, function(err, data) {
   if (err) {
    console.log(err)
    return 
    }
    const book = data[0]
    response.render('editbook', { book })
 })
})

app.post('/books/updatedbook' , (request,response) => {
    const id = request.bory.id
    const title = request.bory.title
    const pageqty = request.body.pageqty
    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return 
        }
        response.redirect('/books')    
    })
})

app.post('/books/remove/:id', (request, response) => {
  const id = req.params.id
  const sql = `DELETE FROM books WHERE id = ${id}`
  conn.query(sql, function(err) {
    if (err) {
        console.log(err)
        return
    }
    response.redirect('/books')
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