const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Menampilkan semua tugas
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// Menambahkan tugas baru
app.post('/api/tasks', (req, res) => {
    const { judul, mata_kuliah, deadline } = req.body;

    const sql = `
        INSERT INTO tasks (judul, mata_kuliah, deadline)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [judul, mata_kuliah, deadline],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Tugas berhasil ditambahkan'
            });
        }
    );
});

app.put('/api/tasks/:id', (req, res) => {

    const id = req.params.id;

    const sql = `
        UPDATE tasks
        SET status = 'Selesai'
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Status berhasil diubah'
        });
    });
});

app.put('/api/tasks/edit/:id', (req, res) => {

    const id = req.params.id;

    const {
        judul,
        mata_kuliah,
        deadline
    } = req.body;

    const sql = `
        UPDATE tasks
        SET judul = ?,
            mata_kuliah = ?,
            deadline = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [judul, mata_kuliah, deadline, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Tugas berhasil diubah'
            });
        }
    );
});

app.delete('/api/tasks/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Tugas berhasil dihapus'
            });
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});