import express from "express";
import { createPlayer, deletePlayer, getPlayer, getPlayers, updatePlayer } from "../Controllers/PlayerControllers.js";

const PlayerRoutes = express.Router();

PlayerRoutes.get('/', getPlayers);
PlayerRoutes.get('/:id', getPlayer);
PlayerRoutes.post('/', createPlayer);
PlayerRoutes.put('/:id', updatePlayer);
PlayerRoutes.delete('/:id', deletePlayer);

export default PlayerRoutes;