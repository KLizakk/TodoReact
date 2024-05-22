const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = './backend/tasks.json';

// Pobierz wszystkie zadania
app.get('/tasks', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        const tasks = JSON.parse(data);
        res.json(tasks);
    });
});

// Dodaj nowe zadanie
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        const tasks = JSON.parse(data);
        tasks.push(newTask);
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(newTask);
        });
    });
});

// Usuń zadanie
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        const tasks = JSON.parse(data);
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(204).end();
            });
        } else {
            res.status(400).json({ error: "Invalid index" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
