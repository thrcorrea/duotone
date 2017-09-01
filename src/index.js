const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imagesRoute = require('./routes/image.js');

app.use('/', imagesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`DuoTone listening on port ${PORT}`);
});