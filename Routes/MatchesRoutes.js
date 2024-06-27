// MatchRoutes.js
import express from "express";
import { createMatch, deleteMatch, getMatch, getMatches, updateMatch } from "../Controllers/MatchesControllers.js";

const MatchRoutes = express.Router();

MatchRoutes.get('/', getMatches);
MatchRoutes.get('/:id', getMatch);
MatchRoutes.post('/', createMatch);
MatchRoutes.put('/:id', updateMatch);
MatchRoutes.delete('/:id', deleteMatch);

export default MatchRoutes;