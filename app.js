import express from 'express';
import { big3Routes } from './routes/big3Routes.js';

const app = express();
const port = 3000;

// View Engine
app.set('view engine', 'ejs');

// Start server
app.listen(process.env.PORT || port);

// Public folder
app.use(express.static('public'));
// Bootstrap & jQuery
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
// DataTable css
app.use('/dt-responsive-css', express.static('node_modules/datatables.net-responsive-bs5/css'));
// DataTable js
app.use('/dt-jquery', express.static('node_modules/datatables.net/js'));
app.use('/dt-js', express.static('node_modules/datatables.net-bs5/js'));

// Home Page
app.get('/', (req, res, next) => {
    res.status(200).render('index', { title: 'Big Three Picker' });
});

// Big3 Routes
app.use('/big3', big3Routes);

// 404 Page
app.use((req, res) => {
    res.status(404).render('404.ejs', { title: '404' });
});