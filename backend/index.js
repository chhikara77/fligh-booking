const express = require("express");
const Amadeus =  require("amadeus");
const cors = require("cors")
const amadeus = new Amadeus({
    clientId: 'HjaGoTdvAdShIpznGdq8nNjwrmX9k7gz',
    clientSecret: 'FFyI5GClWC3r5rxE',
});

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
// app.get('/cors', (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.send({ "msg": "This has CORS enabled 🎈" })
//     })
app.get("/city-search", async (req, res) => {
    const parameter = req.query.location;
    // Which cities or airports start with the parameter variable
    //console.log(parameter)
    amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.any,
        })
        .then(function (response) {
            res.send(response.result);
        })
        .catch(function (response) {
            res.send(response);
        });
});

app.get("/flight-search", (req, res) => {
    const originCode = req.query.originCode;
    const destinationCode = req.query.destinationCode;
    const dateOfDeparture = req.query.departureDate
    console.log("hi",originCode,destinationCode,dateOfDeparture)
    // Find the cheapest flights
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        adults: '1',
        max: '7'
    }).then(function (response) {
        res.send(response.result);
        console.log(response.result)
    }).catch(function (response) {
        res.send(response);
    });
    });
const PORT = 5000;
app.listen(PORT,()=>{console.log("server running")})