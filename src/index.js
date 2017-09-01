const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imagesRoute = require('./routes/image.js');

app.use('/', imagesRoute);


app.listen(80, () => {
    console.log('DuoTone listening on port 3000');
});