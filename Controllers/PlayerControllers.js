// PlayerControllers.js
import connection from '../Database/db.js';

export const getPlayers = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM player');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM player WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlayer = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const [result] = await connection.query('INSERT INTO player (name, email, password, mobile) VALUES (?, ?, ?, ?)', [name, email, password, mobile]);
    res.status(201).json({ id: result.insertId, name, email, password, mobile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, mobile } = req.body;
  try {
    const result = await connection.query('UPDATE player SET name = ?, email = ?, password = ?, mobile = ? WHERE id = ?', [name, email, password, mobile, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ id, name, email, password, mobile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await connection.query('DELETE FROM player WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
