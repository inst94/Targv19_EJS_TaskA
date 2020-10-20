const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', ejs);

app.get('/', (req, res)=> {
    
    res.render('index.ejs', {countr: '',
                            lang: '',
                            cur: ''
                            });
});

app.post('/', (req, res) => {
    let country = req.body.country;
    let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    axios.get(url)
    .then(function(response){
        console.log(response);
        let countryObject = response.data[0];
        let languageObject = response.data[0].languages[0];
        let currencieObject = response.data[0].currencies[0];
        res.render('index.ejs', {countr: countryObject,
                                lang: languageObject,
                                cur: currencieObject
                                });
    })
    .catch(function(error){
        console.log(error);
    });
});
app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server has started.');
});