const fetch = require('node-fetch');

const controller = {};

controller.index = (req, res) => {
    res.status(200).send(`<h1>Api home page </h1>`);
};


// Astronomy Pic of the Day
controller.apod = (req, res) => {
    // adding date param to request articles from different dates
    const date = req.query.date || '';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&hd=true&date=${date}`;
    console.log('url', url)
    fetch(url)
        .then(data => data.json())
        .then(data => res.json(data))
        .catch(error => res.status(404).send({message: 'Error', error}))
};

module.exports = controller;