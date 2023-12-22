const express = require('express');
require('dotenv').config();
const { engine } = require('express-handlebars'); // Adjusted for newer versions
const axios = require('axios');
const app = express();

app.engine('handlebars', engine()); // Adjusted for newer versions
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    res.render('home', { title: 'home antar ra babu' });
})

app.get('/search', async (req, res)=> {
    const symbol = req.query.symbol.toUpperCase();
    const apiKey = process.env.API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const stockData = response.data[0];
        const company = stockData.name;
        console.log(stockData)
        const stockPrice = stockData.price;
		console.log(symbol, stockPrice);    
        res.render('stockPrice', { title: "stock stalk", company: company, stockPrice: stockPrice });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).send('Error fetching stock data');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Changed to template literal

