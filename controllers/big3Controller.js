import { big3 } from '../data/big3.js';
import fetch from 'node-fetch';

// Get Data for DataTable
const big3_data = (req, res) => {
    const data = big3.getData;
    res.status(200).json(data);
}

// Details Page
const big3_details = (req, res) => {
    const sunSign = req.query.sun;
    const moonSign = req.query.moon;
    const risingSign = req.query.rising;
    
    const sunImgUrl = big3.imgUrls[sunSign];
    const moonImgUrl = big3.imgUrls[moonSign];
    const risingImgUrl = big3.imgUrls[risingSign];
    
    res.status(200).render('details', { 
        sun: big3.sunData[sunSign], 
        moon: big3.moonData[moonSign], 
        rising: big3.risingData[risingSign],
        sunImg: sunImgUrl,
        moonImg: moonImgUrl,
        risingImg: risingImgUrl,
        title: 'About'
    });
}

// API for horoscope
const big3_horoscope = async (req, res) => {
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
        res.status(500).render('500.js', { title: '500' });
    });
}

const big3Controllers = {
    data: big3_data,
    details: big3_details,
    horoscope: big3_horoscope
};

export {
    big3Controllers
};