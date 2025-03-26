const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("here")
    res.sendStatus()
});

app.listen(3000)