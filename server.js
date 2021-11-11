const { response } = require("express")
const express = require("express")


const app = express()

// app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const APIkey = "d31d357f48960dd5ec61aeb63463a4ea"
    // const api = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + APIkey

app.get("/", (req, res) => {
    res.send("Welcome to my server, insert city and date to get weather")
        // res.render("index", { text: "World" })
})

const weatherRouter = require('./routes/weather')
app.use('/weather', weatherRouter)






app.listen(3000)