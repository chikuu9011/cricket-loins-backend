import express from 'express';
import connection from './Database/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import PlayerRoutes from './Routes/PlayerRoutes.js';
import MatchRoutes from './Routes/MatchesRoutes.js';
import router from './Routes/playedRoutes.js';


const app = express();

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

connection.query('SELECT 1')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err);
  });

// Middleware
app.use('/players', PlayerRoutes); // Player routes
app.use('/matches', MatchRoutes); // Match routes
app.use('/played', router); // Match routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
