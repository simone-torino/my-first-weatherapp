const express = require("express")
const router = express.Router()
const https = require("https")

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const APIkey = "d31d357f48960dd5ec61aeb63463a4ea"

router.get('/', (req, res) => {
    // res.render("index")

    // console.log("Queries inserted: ", req.query.city, req.query.date)

    const api = "https://api.openweathermap.org/data/2.5/forecast?q=" + req.query.city + "&appid=" + APIkey
        // const date = "2021-11-12"

    https.get(api, (res) => {
        console.log(res.statusCode); //Controlla che sia connesso

        res.on("data", (data) => {

            const weatherData = JSON.parse(data);

            var datefound = false
            for (let index = 0; index < weatherData.list.length; index++) {

                // console.log("checking date: ", weatherData.list[index].dt_txt.substr(0, 10))
                if (weatherData.list[index].dt_txt.substr(0, 10) == req.query.date) {

                    //Per stampare solo una certa ora del giorno
                    // if (weatherData.list[index].dt_txt.substr(11, 13) == "12:00:00") {
                    console.log(weatherData.list[index].main)
                    console.log(weatherData.list[index].weather)
                    datefound = true;
                    // }
                }
            }
            if (!datefound) {
                console.log("Error: date requested is not in the range of maximum 5 days from today")
            }

        })
    })
    res.redirect("/")
})


module.exports = router