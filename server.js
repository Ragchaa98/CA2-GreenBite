const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty1234',
  database: 'greenbite_db'
});

db.connect((err) => {
  if (err) {
    
    console.error('Database connection failed:', err);
    return;
  }
  
  console.log('Database connected!');
});

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/basket', (req, res) => {
  db.query('SELECT basket.id, products.name, products.price, products.image, basket.quantity FROM basket JOIN products ON basket.product_id = products.id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/basket', (req, res) => {
  const { product_id } = req.body;
  db.query('INSERT INTO basket (product_id, quantity) VALUES (?, 1)', [product_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/basket/:id', (req, res) => {
  db.query('DELETE FROM basket WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(3000, () => {
  
  console.log('Server running at: http://localhost:3000');
});