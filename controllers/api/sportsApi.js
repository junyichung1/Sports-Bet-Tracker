const fetch = require('node-fetch');
const API_KEY = process.env.REACT_APP_API_KEY;
const axios = require('axios');
const leagueLookup = {
    nfl: 4391,
    nhl: 4380,
    nba: 4387,
    mlb: 4424
}

module.exports = {
    getLeagueRecords,
    leagueDetail,
}

function leagueDetail(req, res) {
    axios.get(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookup_all_teams.php?id=4391`)
    .then(function (response) {
    // handle success
        console.log(response);
        res.json(response.data)
    })
    .catch(function (error) {
    // handle error
        console.log(error);
    })
}

function getLeagueRecords(req, res) {
    console.log(`${API_KEY}`)
    axios.get(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${leagueDetail[req.params.id]}&s=2020`)
    .then(function (response) {
    // handle success
        console.log(response);
        res.json(response.data)
    })
    .catch(function (error) {
    // handle error
        console.log(error);
    })
    }

  