const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/subject", require("./routes/subjects"));

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server Started on Port ${port}..`))