import express from 'express';
import { big3Controllers } from '../controllers/big3Controller.js';

const router = express.Router();

router.get('/', big3Controllers.data);
router.get('/details', big3Controllers.details);
router.get('/horoscope/:sign', big3Controllers.horoscope);

const big3Routes = router;

export {
    big3Routes
};