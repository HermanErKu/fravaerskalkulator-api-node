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

app.post("/msg", (req, res, next) => {
 const message = req.body.message;
 res.json({"receivedMessage": message});
});