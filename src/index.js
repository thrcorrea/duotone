const express = require('express');

const app = express();

const imagesRoute = require('./routes/image.js');

app.use('/images', imagesRoute);


app.listen(3000, () => {
    console.log('DuoTone listening on port 3000');
});