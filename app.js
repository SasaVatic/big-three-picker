import express from 'express';
import {big3} from './data/big3.js';
import fetch from 'node-fetch';

const app = express();

// View Engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});

// Public folder
app.use(express.static('public'));
// Bootstrap & jQuery
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
// DataTable
app.use('/dt-jquery', express.static('node_modules/datatables.net/js'));
app.use('/dt-css', express.static('node_modules/datatables.net-bs5/css'));
app.use('/dt-responsive-css', express.static('node_modules/datatables.net-responsive-bs5/css'));
app.use('/dt-responsive-js', express.static('node_modules/datatables.net-responsive-bs5/js'));
app.use('/dt-css', express.static('node_modules/datatables.net-bs5/css'));
app.use('/dt-js', express.static('node_modules/datatables.net-bs5/js'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/big3', (req, res, next) => {
    const data = big3.getData;
    res.json(data);
});

app.get('/details', (req, res, next) => {
    const sunSign = req.query.sun;
    const moonSign = req.query.moon;
    const risingSign = req.query.rising;
    
    const sunImgUrl = big3.imgUrls[sunSign];
    const moonImgUrl = big3.imgUrls[moonSign];
    const risingImgUrl = big3.imgUrls[risingSign];
    
    res.render('details', { 
        sun: big3.sunData[sunSign], 
        moon: big3.moonData[moonSign], 
        rising: big3.risingData[risingSign],
        sunImg: sunImgUrl,
        moonImg: moonImgUrl,
        risingImg: risingImgUrl
    });
});

app.get('/horoscope/:sign', async (req, res, next) => {
    const horoscopeSign = req.params.sign;
    await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${horoscopeSign}&day=today`, {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
            "x-rapidapi-key": "5a9db871f1msh86b8c3d20997725p1a04e7jsnbca7b9c4c9e6"
        }
    })
    .then(response => {
        return response.json();
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send('Something went wrong');
    });
});