const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const imagesRoute = require('./routes/image.js');

app.use('/images', imagesRoute);


app.listen(3000, () => {
    console.log('DuoTone listening on port 3000');
});