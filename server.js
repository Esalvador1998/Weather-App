const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Assuming your HTML, CSS, and client-side JS files are in a directory named "public"

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // Send weather data to the client
        res.json(weatherData);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while trying to fetch weather data.');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
