const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();    // cause it's a file?

const app = express();  // connect to backend? db?

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;   // connect to port?

app.listen(PORT, () => {    // listen to port (connect to server)
    console.log(`Server is running on ${PORT}`);
});