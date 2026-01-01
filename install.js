const express = require("express")
const fs = require('fs')
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files })
    console.log(err)
  })
})

app.get('/file/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render('show',{filename: req.params.filename, filedata: filedata})
  })
})

app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail, (err) => {
    res.redirect("/")
  })
})

app.get("/edit/:filename", (req, res) => {
  res.render("edit", {filename : req.params.filename})
})

app.post("/edit", (req, res) => {
  console.log(req.body)
  fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}.txt`, (err) => {
    res.redirect('/')
  })
})

app.listen(3001, () => {
  console.log("server is running")
})