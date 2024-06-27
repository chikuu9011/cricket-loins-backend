// MatchControllers.js
import connection from '../Database/db.js';

export const getMatches = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM matches');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM matches WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMatch = async (req, res) => {
  const { name, ground, date, fees } = req.body;
  try {
    const [result] = await connection.query('INSERT INTO matches (name, ground, date, fees) VALUES (?, ?, ?, ?)', [name, ground, date, fees]);
    res.status(201).json({ id: result.insertId, name, ground, date, fees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { name, ground, date, fees } = req.body;
  try {
    const result = await connection.query('UPDATE matches SET name = ?, ground = ?, date = ?, fees = ? WHERE id = ?', [name, ground, date, fees, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ id, name, ground, date, fees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await connection.query('DELETE FROM matches WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
