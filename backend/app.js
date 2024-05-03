const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});
