import axios from "axios";

// export const PHILOSOPHY_API = "https://catfact.ninja/fact";
export const PHILOSOPHY_API = "https://philosophyapi.pythonanywhere.com/api/ideas/";


// const api = axios.create({
//                              withCredentials: true,
//                          });

export const getPhilosophers = async () => {
    const response = await axios.get(
        `${PHILOSOPHY_API}`
    );
    return await response.data;
};
//
// const axios = require("axios");

// const options = {
//     method: 'GET',
//     url: 'https://list-of-philosophers.p.rapidapi.com/Philosopher',
//     headers: {
//         'X-RapidAPI-Key': '97d117a40fmshe0afeb383725404p17efc3jsn0719314768d2',
//         'X-RapidAPI-Host': 'list-of-philosophers.p.rapidapi.com'
//     }
// };

// const options = {
//     method: 'GET',
//     url: 'https://list-of-philosophers.p.rapidapi.com/Philosopher-By-Name',
//     params: {name: 'Nietzsche'},
//     headers: {
//         'X-RapidAPI-Key': '97d117a40fmshe0afeb383725404p17efc3jsn0719314768d2',
//         'X-RapidAPI-Host': 'list-of-philosophers.p.rapidapi.com'
//     }
// };

const options = {};

export const testAPI = () => {
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
