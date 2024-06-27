import express from 'express';
import { createMatch, getMatchById, getMatchesByDate, updateMatchPaidStatusById,  } from '../Controllers/playedControl.js';

const router = express.Router();

router.get('/matches/date/:date', getMatchesByDate);
router.get('/matches/id/:id', getMatchById);
router.post('/matches', createMatch);
router.put('/matches/id/:id',updateMatchPaidStatusById );

export default router;
