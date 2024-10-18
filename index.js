const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});



// status get endpoint
app.get("/status", (req, res, next) => {
    res.json({ "status": "running" });
});





const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

app.use(express.json());


//// utdanningspogrammer endpoints
db.run("CREATE TABLE IF NOT EXISTS utdanningsprogrammer (id INTEGER PRIMARY KEY AUTOINCREMENT, navn STRING, forkortelse STRING);")

// empty endpoints
app.get("/api", (req, res, next) => {
    db.all("SELECT * FROM utdanningsprogrammer", (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.post("/api", (req, res, next) => {
    const message = req.body;
    console.log(message);
    db.run('INSERT INTO utdanningsprogrammer (navn, forkortelse) VALUES (?, ?)', message.navn, message.forkortelse, (err) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ "id": this.lastID });
    });
});



// ID specific endpoints
app.get("/api/:id", (req, res, next) => {
    db.all("SELECT * FROM utdanningsprogrammer WHERE id = ?", req.params.id, (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.put("/api/:id", (req, res, next) => {
    const message = req.body;
    db.run('UPDATE utdanningsprogrammer SET navn = ?, forkortelse = ? WHERE id = ?', message.navn, message.forkortelse, req.params.id, (err) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ "id": this.lastID });
    });
});

app.delete("/api/:id", (req, res, next) => {
    db.run('DELETE FROM utdanningsprogrammer WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({ "deleted": this.changes });
    });
});
