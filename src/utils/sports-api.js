import tokenService from './tokenService'
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = '/api/sportsApi';

export default {
    getAll,
    // leagueDetail
}


export function getAll() {
    return fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      }})
    .then(res => res.json());
  }

// function leagueDetail() {

// }

// export function getLeagueRecords() {
//     console.log(`${API_KEY}`)
//     fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=4391&s=2020`)
//         .then(res => res.json())
//         .then((data) => data)
    // return fetch('/api/sportsdb')
    //     .then(res => res.json())
// }

// export function getLeagueRecords(leagueID, year) {
//     console.log()
//     return fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${leagueID}&s=${year}`)
//         .then(res => res.json())
// }



