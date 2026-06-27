const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./database/db");
const userRoute = require("./routes/userRoute");
dotenv.config();    // cause it's a file?

const app = express();  // connect to backend? db?

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    console.log("Server is running");
    res.send("The backend is running");
});   // connect to port?


app.get('/db-config', async (req, res) => {
    const result = await pool.query("SELECT * from student");
    res.json(result.rows);
});

app.use("/api",userRoute);
app.listen(PORT, () => {    // listen to port (connect to server)
    console.log(`Server is running on ${PORT}`);
});


if(require.main == module){
    app.listen(PORT,() => {
        console.log(`Server is run hi ${PORT}`);
    });
}
module.exports = app;