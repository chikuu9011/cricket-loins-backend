import connection from '../Database/db.js'; // Adjust path as per your project structure

// Get matches by date
export const getMatchesByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM played WHERE date = ?', [date]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching matches by date:', error);
    res.status(500).json({ message: 'Failed to fetch matches' });
  }
};

// Get match by ID
export const getMatchById = async (req, res) => {
  const { id } = req.params; // Assuming match ID is passed in the URL params
  try {
    const [rows] = await connection.query('SELECT * FROM played WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(rows[0]); // Assuming only one match will be found with a given ID
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    res.status(500).json({ message: 'Failed to fetch match' });
  }
};

// Create a new match
export const createMatch = async (req, res) => {
  const { name, playername, ground, date, fees, paid } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO played (name, playername, ground, date, fees, paid) VALUES (?, ?, ?, ?, ?, ?)',
      [name, playername, ground, date, fees, paid]
    );
    res.status(201).json({ id: result.insertId, name, playername, ground, date, fees, paid });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ message: 'Failed to create match' });
  }
};

// Update a match by ID
export const updateMatchPaidStatusById = async (req, res) => {
  const { id } = req.params; // Assuming match ID is passed in the URL params
  const { paid } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE played SET paid = ? WHERE id = ?',
      [paid, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ id, paid });
  } catch (error) {
    console.error('Error updating match paid status by ID:', error);
    res.status(500).json({ message: 'Failed to update match paid status' });
  }
};